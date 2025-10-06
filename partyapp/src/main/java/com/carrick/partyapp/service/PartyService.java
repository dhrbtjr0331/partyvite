package com.carrick.partyapp.service;

import com.carrick.partyapp.dto.PartyRequest;
import com.carrick.partyapp.dto.PartyResponse;
import com.carrick.partyapp.exception.ResourceNotFoundException;
import com.carrick.partyapp.exception.UnauthorizedException;
import com.carrick.partyapp.model.Party;
import com.carrick.partyapp.model.RSVPStatus;
import com.carrick.partyapp.model.User;
import com.carrick.partyapp.repository.PartyRepository;
import com.carrick.partyapp.repository.RSVPRepository;
import com.carrick.partyapp.repository.UserRepository;
import com.carrick.partyapp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartyService {
    
    @Autowired
    private PartyRepository partyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RSVPRepository rsvpRepository;
    
    // Create a new party
    @Transactional
    public PartyResponse createParty(PartyRequest partyRequest, UserPrincipal currentUser) {
        User host = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Party party = new Party();
        party.setTitle(partyRequest.getTitle());
        party.setDescription(partyRequest.getDescription());
        party.setLocation(partyRequest.getLocation());
        party.setPartyDateTime(partyRequest.getPartyDateTime());
        party.setCapacity(partyRequest.getCapacity());
        party.setIsPublic(partyRequest.getIsPublic());
        party.setHost(host);
        
        Party savedParty = partyRepository.save(party);
        
        return mapToPartyResponse(savedParty);
    }
    
    // Get all public parties
    @Transactional(readOnly = true)
    public List<PartyResponse> getAllPublicParties() {
        List<Party> parties = partyRepository.findUpcomingPublicParties(LocalDateTime.now());
        return parties.stream()
                .map(this::mapToPartyResponse)
                .collect(Collectors.toList());
    }
    
    // Get party by ID
    @Transactional(readOnly = true)
    public PartyResponse getPartyById(Long partyId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found with id: " + partyId));
        
        return mapToPartyResponse(party);
    }
    
    // Get parties hosted by current user
    @Transactional(readOnly = true)
    public List<PartyResponse> getMyHostedParties(UserPrincipal currentUser) {
        List<Party> parties = partyRepository.findByHostId(currentUser.getId());
        return parties.stream()
                .map(this::mapToPartyResponse)
                .collect(Collectors.toList());
    }
    
    // Update party
    @Transactional
    public PartyResponse updateParty(Long partyId, PartyRequest partyRequest, UserPrincipal currentUser) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found with id: " + partyId));
        
        // Check if current user is the host
        if (!party.getHost().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not authorized to update this party");
        }
        
        party.setTitle(partyRequest.getTitle());
        party.setDescription(partyRequest.getDescription());
        party.setLocation(partyRequest.getLocation());
        party.setPartyDateTime(partyRequest.getPartyDateTime());
        party.setCapacity(partyRequest.getCapacity());
        party.setIsPublic(partyRequest.getIsPublic());
        
        Party updatedParty = partyRepository.save(party);
        
        return mapToPartyResponse(updatedParty);
    }
    
    // Delete party
    @Transactional
    public void deleteParty(Long partyId, UserPrincipal currentUser) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found with id: " + partyId));
        
        // Check if current user is the host
        if (!party.getHost().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not authorized to delete this party");
        }
        
        partyRepository.delete(party);
    }
    
    // Helper method to map Party entity to PartyResponse DTO
    // Fixed to avoid ConcurrentModificationException
    private PartyResponse mapToPartyResponse(Party party) {
        PartyResponse response = new PartyResponse();
        response.setId(party.getId());
        response.setTitle(party.getTitle());
        response.setDescription(party.getDescription());
        response.setLocation(party.getLocation());
        response.setPartyDateTime(party.getPartyDateTime());
        response.setCapacity(party.getCapacity());
        response.setIsPublic(party.getIsPublic());
        response.setHostId(party.getHost().getId());
        response.setHostUsername(party.getHost().getUsername());
        
        // Use repository to count RSVPs instead of accessing party.getRsvps()
        long rsvpCount = rsvpRepository.countByPartyIdAndStatus(party.getId(), RSVPStatus.GOING);
        response.setRsvpCount((int) rsvpCount);
        
        // Check capacity
        boolean atCapacity = party.getCapacity() != null && rsvpCount >= party.getCapacity();
        response.setAtCapacity(atCapacity);
        
        response.setCreatedAt(party.getCreatedAt());
        
        return response;
    }
}