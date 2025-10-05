package com.carrick.partyapp.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PartyRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 100)
    private String title;
    
    private String description;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Party date and time is required")
    @Future(message = "Party date must be in the future")
    private LocalDateTime partyDateTime;
    
    private Integer capacity;
    
    private Boolean isPublic = true;
}