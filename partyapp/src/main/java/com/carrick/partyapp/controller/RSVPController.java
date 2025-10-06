package com.carrick.partyapp.controller;

import com.carrick.partyapp.dto.MessageResponse;
import com.carrick.partyapp.dto.RSVPRequest;
import com.carrick.partyapp.dto.RSVPResponse;
import com.carrick.partyapp.security.UserPrincipal;
import com.carrick.partyapp.service.RSVPService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rsvps")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RSVPController {
    
    @Autowired
    private RSVPService rsvpService;
    
    // Create or update RSVP
    @PostMapping
    public ResponseEntity<RSVPResponse> createOrUpdateRSVP(
            @Valid @RequestBody RSVPRequest rsvpRequest,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        RSVPResponse response = rsvpService.createOrUpdateRSVP(rsvpRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // Get all RSVPs for a party
    @GetMapping("/party/{partyId}")
    public ResponseEntity<List<RSVPResponse>> getRSVPsForParty(@PathVariable Long partyId) {
        List<RSVPResponse> rsvps = rsvpService.getRSVPsForParty(partyId);
        return ResponseEntity.ok(rsvps);
    }
    
    // Get my RSVPs
    @GetMapping("/my-rsvps")
    public ResponseEntity<List<RSVPResponse>> getMyRSVPs(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        List<RSVPResponse> rsvps = rsvpService.getMyRSVPs(currentUser);
        return ResponseEntity.ok(rsvps);
    }
    
    // Get my RSVP for a specific party
    @GetMapping("/party/{partyId}/me")
    public ResponseEntity<RSVPResponse> getMyRSVPForParty(
            @PathVariable Long partyId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        RSVPResponse rsvp = rsvpService.getMyRSVPForParty(partyId, currentUser);
        
        if (rsvp == null) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(rsvp);
    }
    
    // Cancel RSVP
    @DeleteMapping("/party/{partyId}")
    public ResponseEntity<MessageResponse> cancelRSVP(
            @PathVariable Long partyId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        rsvpService.cancelRSVP(partyId, currentUser);
        return ResponseEntity.ok(new MessageResponse("RSVP cancelled successfully"));
    }
}