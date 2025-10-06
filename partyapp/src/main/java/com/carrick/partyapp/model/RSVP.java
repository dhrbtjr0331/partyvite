package com.carrick.partyapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "rsvps", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"party_id", "user_id"}),
       indexes = {
           @Index(name = "idx_rsvps_party_id", columnList = "party_id"), // FK index
           @Index(name = "idx_rsvps_user_id", columnList = "user_id"),   // FK index
           @Index(name = "idx_rsvps_party_status", columnList = "party_id, status")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RSVP {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id", nullable = false)
    private Party party;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RSVPStatus status = RSVPStatus.GOING;
    
    @CreationTimestamp
    @Column(name = "rsvp_date", updatable = false)
    private LocalDateTime rsvpDate;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}