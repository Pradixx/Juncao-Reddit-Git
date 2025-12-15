package com.digitodael.redgit.infrastructure.security;

import com.digitodael.redgit.infrastructure.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("userSecurity")
public class UserSecurity {

    public boolean isOwner(UUID userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        Object principal = auth.getPrincipal();
        if (principal instanceof User user) {
            return user.getId().equals(userId);
        }

        return false;
    }
}
