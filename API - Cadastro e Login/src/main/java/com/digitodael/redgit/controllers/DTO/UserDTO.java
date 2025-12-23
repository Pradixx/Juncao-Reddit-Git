package com.digitodael.redgit.controllers.DTO;

import com.digitodael.redgit.infrastructure.entity.User;
import com.digitodael.redgit.infrastructure.entity.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private UserRole role;
    private boolean enabled;
    private boolean accountNonLocked;
    private LocalDateTime createdAt;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.enabled = user.isEnabled();
        this.accountNonLocked = user.isAccountNonLocked();
        this.createdAt = user.getCreatedAt();
    }
}