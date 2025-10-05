package com.carrick.partyapp.dto;

import com.carrick.partyapp.model.RSVPStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RSVPRequest {
    
    @NotNull(message = "Party ID is required")
    private Long partyId;
    
    private RSVPStatus status = RSVPStatus.GOING;
}