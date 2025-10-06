package com.carrick.partyapp.controller;

import com.carrick.partyapp.model.User;
import com.carrick.partyapp.security.UserPrincipal;
import com.carrick.partyapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // Get current user profile
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        User user = userService.getCurrentUser(currentUser);
        // Don't send password to frontend
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        // Don't send password to frontend
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}