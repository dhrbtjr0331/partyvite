package com.carrick.partyapp.dto;

import com.carrick.partyapp.model.RSVPStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RSVPResponse {
    private Long id;
    private Long partyId;
    private String partyTitle;
    private Long userId;
    private String username;
    private RSVPStatus status;
    private LocalDateTime rsvpDate;
}