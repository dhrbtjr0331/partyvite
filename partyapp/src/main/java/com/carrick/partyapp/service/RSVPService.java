package com.carrick.partyapp.service;

import com.carrick.partyapp.dto.RSVPRequest;
import com.carrick.partyapp.dto.RSVPResponse;
import com.carrick.partyapp.exception.BadRequestException;
import com.carrick.partyapp.exception.ResourceNotFoundException;
import com.carrick.partyapp.model.Party;
import com.carrick.partyapp.model.RSVP;
import com.carrick.partyapp.model.RSVPStatus;
import com.carrick.partyapp.model.User;
import com.carrick.partyapp.repository.PartyRepository;
import com.carrick.partyapp.repository.RSVPRepository;
import com.carrick.partyapp.repository.UserRepository;
import com.carrick.partyapp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RSVPService {
    
    @Autowired
    private RSVPRepository rsvpRepository;
    
    @Autowired
    private PartyRepository partyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Create or update RSVP
    @Transactional
    public RSVPResponse createOrUpdateRSVP(RSVPRequest rsvpRequest, UserPrincipal currentUser) {
        Party party = partyRepository.findById(rsvpRequest.getPartyId())
                .orElseThrow(() -> new ResourceNotFoundException("Party not found"));
        
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // Check if user is trying to RSVP to their own party
        if (party.getHost().getId().equals(currentUser.getId())) {
            throw new BadRequestException("You cannot RSVP to your own party");
        }
        
        // Check if party is at capacity (only for GOING status)
        if (rsvpRequest.getStatus() == RSVPStatus.GOING && party.isAtCapacity()) {
            // Check if user already has a GOING RSVP (then they can keep it)
            RSVP existingRsvp = rsvpRepository.findByPartyIdAndUserId(party.getId(), user.getId()).orElse(null);
            if (existingRsvp == null || existingRsvp.getStatus() != RSVPStatus.GOING) {
                throw new BadRequestException("Party is at capacity");
            }
        }
        
        // Check if RSVP already exists
        RSVP rsvp = rsvpRepository.findByPartyIdAndUserId(party.getId(), user.getId())
                .orElse(new RSVP());
        
        rsvp.setParty(party);
        rsvp.setUser(user);
        rsvp.setStatus(rsvpRequest.getStatus());
        
        RSVP savedRsvp = rsvpRepository.save(rsvp);
        
        return mapToRSVPResponse(savedRsvp);
    }
    
    // Get all RSVPs for a party
    public List<RSVPResponse> getRSVPsForParty(Long partyId) {
        @SuppressWarnings("unused")
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found"));
        
        List<RSVP> rsvps = rsvpRepository.findByPartyId(partyId);
        
        return rsvps.stream()
                .map(this::mapToRSVPResponse)
                .collect(Collectors.toList());
    }
    
    // Get all RSVPs for current user
    public List<RSVPResponse> getMyRSVPs(UserPrincipal currentUser) {
        List<RSVP> rsvps = rsvpRepository.findByUserId(currentUser.getId());
        
        return rsvps.stream()
                .filter(rsvp -> rsvp.getStatus() != RSVPStatus.CANCELLED)
                .map(this::mapToRSVPResponse)
                .collect(Collectors.toList());
    }
    
    // Get user's RSVP for a specific party
    public RSVPResponse getMyRSVPForParty(Long partyId, UserPrincipal currentUser) {
        RSVP rsvp = rsvpRepository.findByPartyIdAndUserId(partyId, currentUser.getId())
                .orElse(null);
        
        if (rsvp == null) {
            return null;
        }
        
        return mapToRSVPResponse(rsvp);
    }
    
    // Cancel RSVP
    @Transactional
    public void cancelRSVP(Long partyId, UserPrincipal currentUser) {
        RSVP rsvp = rsvpRepository.findByPartyIdAndUserId(partyId, currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("RSVP not found"));
        
        // Option 1: Delete the RSVP
        // rsvpRepository.delete(rsvp);
        
        // Option 2: Mark as CANCELLED (better for tracking)
        rsvp.setStatus(RSVPStatus.CANCELLED);
        rsvpRepository.save(rsvp);
    }
    
    // Helper method to map RSVP entity to RSVPResponse DTO
    private RSVPResponse mapToRSVPResponse(RSVP rsvp) {
        RSVPResponse response = new RSVPResponse();
        response.setId(rsvp.getId());
        response.setPartyId(rsvp.getParty().getId());
        response.setPartyTitle(rsvp.getParty().getTitle());
        response.setUserId(rsvp.getUser().getId());
        response.setUsername(rsvp.getUser().getUsername());
        response.setStatus(rsvp.getStatus());
        response.setRsvpDate(rsvp.getRsvpDate());
        
        return response;
    }
}