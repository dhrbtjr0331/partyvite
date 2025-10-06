package com.carrick.partyapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parties", indexes = {
    @Index(name = "idx_parties_host_id", columnList = "host_id"), // FK index
    @Index(name = "idx_parties_date_public", columnList = "party_date_time, is_public")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Party {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;
    
    @NotNull(message = "Party date and time is required")
    @Future(message = "Party date must be in the future")
    @Column(name = "party_date_time", nullable = false)
    private LocalDateTime partyDateTime;
    
    private Integer capacity;
    
    @Column(name = "is_public")
    private Boolean isPublic = true;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id", nullable = false)
    @JsonIgnore
    private User host;
    
    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RSVP> rsvps = new ArrayList<>();
    
    // Helper method to get RSVP count - synchronized to prevent concurrent modification
    public synchronized int getRsvpCount() {
        if (rsvps == null) {
            return 0;
        }
        return (int) rsvps.stream()
                .filter(rsvp -> rsvp.getStatus() == RSVPStatus.GOING)
                .count();
    }
    
    // Check if party is at capacity
    public synchronized boolean isAtCapacity() {
        if (capacity == null) return false;
        return getRsvpCount() >= capacity;
    }
}