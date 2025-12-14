package com.digitodael.redgit.controllers;

import com.digitodael.redgit.controllers.DTO.UserDTO;
import com.digitodael.redgit.controllers.DTO.ChangeRoleDTO;
import com.digitodael.redgit.infrastructure.entity.User;
import com.digitodael.redgit.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserDTO> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<UserDTO> changeUserRole(
            @PathVariable UUID id,
            @RequestBody @Valid ChangeRoleDTO dto) {
        User user = userService.changeRole(id, dto.getRole());
        return ResponseEntity.ok(new UserDTO(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/lock")
    public ResponseEntity<Void> lockUser(@PathVariable UUID id) {
        userService.lockAccount(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/unlock")
    public ResponseEntity<Void> unlockUser(@PathVariable UUID id) {
        userService.unlockAccount(id);
        return ResponseEntity.noContent().build();
    }
}
