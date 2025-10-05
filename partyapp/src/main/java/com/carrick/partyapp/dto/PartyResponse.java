package com.carrick.partyapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartyResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private LocalDateTime partyDateTime;
    private Integer capacity;
    private Boolean isPublic;
    private Long hostId;
    private String hostUsername;
    private int rsvpCount;
    private boolean atCapacity;
    private LocalDateTime createdAt;
}
