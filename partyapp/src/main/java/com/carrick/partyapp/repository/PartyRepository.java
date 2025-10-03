package com.carrick.partyapp.repository;

import com.carrick.partyapp.model.Party;
import com.carrick.partyapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    
    List<Party> findByIsPublicTrue();
    
    List<Party> findByHost(User host);
    
    List<Party> findByHostId(Long hostId);
    
    // Find upcoming parties (future date)
    List<Party> findByPartyDateTimeAfter(LocalDateTime dateTime);
    
    // Find public upcoming parties
    @Query("SELECT p FROM Party p WHERE p.isPublic = true AND p.partyDateTime > :currentTime ORDER BY p.partyDateTime ASC")
    List<Party> findUpcomingPublicParties(LocalDateTime currentTime);
}