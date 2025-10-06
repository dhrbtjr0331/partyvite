package com.carrick.partyapp.controller;

import com.carrick.partyapp.dto.MessageResponse;
import com.carrick.partyapp.dto.PartyRequest;
import com.carrick.partyapp.dto.PartyResponse;
import com.carrick.partyapp.security.UserPrincipal;
import com.carrick.partyapp.service.PartyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PartyController {
    
    @Autowired
    private PartyService partyService;
    
    // Create a new party
    @PostMapping
    public ResponseEntity<PartyResponse> createParty(
            @Valid @RequestBody PartyRequest partyRequest,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        PartyResponse response = partyService.createParty(partyRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // Get all public parties
    @GetMapping
    public ResponseEntity<List<PartyResponse>> getAllPublicParties() {
        List<PartyResponse> parties = partyService.getAllPublicParties();
        return ResponseEntity.ok(parties);
    }
    
    // Get party by ID
    @GetMapping("/{id}")
    public ResponseEntity<PartyResponse> getPartyById(@PathVariable Long id) {
        PartyResponse party = partyService.getPartyById(id);
        return ResponseEntity.ok(party);
    }
    
    // Get my hosted parties
    @GetMapping("/my-parties")
    public ResponseEntity<List<PartyResponse>> getMyHostedParties(
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        List<PartyResponse> parties = partyService.getMyHostedParties(currentUser);
        return ResponseEntity.ok(parties);
    }
    
    // Update party
    @PutMapping("/{id}")
    public ResponseEntity<PartyResponse> updateParty(
            @PathVariable Long id,
            @Valid @RequestBody PartyRequest partyRequest,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        PartyResponse response = partyService.updateParty(id, partyRequest, currentUser);
        return ResponseEntity.ok(response);
    }
    
    // Delete party
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteParty(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        partyService.deleteParty(id, currentUser);
        return ResponseEntity.ok(new MessageResponse("Party deleted successfully"));
    }
}