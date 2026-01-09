package com.redgit.auth.controllers;

import com.redgit.auth.controllers.DTO.AdminStatsDTO;
import com.redgit.auth.controllers.DTO.UserDTO;
import com.redgit.auth.controllers.DTO.ChangeRoleDTO;
import com.redgit.auth.infrastructure.entity.User;
import com.redgit.auth.infrastructure.redis.RateLimitService;
import com.redgit.auth.service.UserService;
import com.redgit.auth.infrastructure.entity.UserRole;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final RateLimitService rateLimitService; // ⭐ NOVO

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserDTO> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(new UserDTO(user));
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

    @PutMapping("/users/{id}/disable")
    public ResponseEntity<Void> disableUser(@PathVariable UUID id) {
        userService.disableAccount(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/enable")
    public ResponseEntity<Void> enableUser(@PathVariable UUID id) {
        userService.enableAccount(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        AdminStatsDTO stats = new AdminStatsDTO();
        stats.setTotalUsers(userService.countUsers());
        stats.setTotalAdmins(userService.countByRole(UserRole.ADMIN));
        stats.setTotalRegularUsers(userService.countByRole(UserRole.USER));
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/users/unblock-ratelimit")
    public ResponseEntity<Map<String, String>> unblockUserRateLimit(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email é obrigatório"));
        }

        rateLimitService.unblockUser(email);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuário desbloqueado com sucesso");
        response.put("email", email);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/ratelimit-status")
    public ResponseEntity<Map<String, Object>> getRateLimitStatus(
            @RequestParam String email) {

        Map<String, Object> status = new HashMap<>();
        status.put("email", email);
        status.put("isBlocked", rateLimitService.isBlocked(email));
        status.put("remainingAttempts", rateLimitService.getRemainingAttempts(email));
        status.put("blockTimeRemaining", rateLimitService.getBlockTimeRemaining(email));

        return ResponseEntity.ok(status);
    }
}