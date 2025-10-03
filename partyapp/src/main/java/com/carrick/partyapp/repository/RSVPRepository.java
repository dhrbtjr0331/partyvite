package com.carrick.partyapp.repository;

import com.carrick.partyapp.model.RSVP;
import com.carrick.partyapp.model.RSVPStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RSVPRepository extends JpaRepository<RSVP, Long> {

    List<RSVP> findByUserId(Long userId);

    List<RSVP> findByPartyId(Long partyId);

    Optional<RSVP> findByPartyIdAndUserId(Long partyId, Long userId);

    Boolean existsByPartyIdAndUserId(Long partyId, Long userId);

    List<RSVP> findByUserIdAndStatus(Long userId, RSVPStatus status);
    
    List<RSVP> findByPartyIdAndStatus(Long partyId, RSVPStatus status);
    
    // Count RSVPs with GOING status for a party
    long countByPartyIdAndStatus(Long partyId, RSVPStatus status);
}