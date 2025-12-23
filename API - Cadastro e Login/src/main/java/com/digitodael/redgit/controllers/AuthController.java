package com.digitodael.redgit.controllers;

import com.digitodael.redgit.controllers.DTO.LoginRequestDTO;
import com.digitodael.redgit.controllers.DTO.RegisterRequestDTO;
import com.digitodael.redgit.controllers.DTO.ResponseDTO;
import com.digitodael.redgit.infrastructure.entity.User;
import com.digitodael.redgit.infrastructure.entity.UserRole;
import com.digitodael.redgit.infrastructure.repository.UserRepository;
import com.digitodael.redgit.service.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody @Valid LoginRequestDTO body){
        User user = this.repository.findByEmail(body.email())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não identificado"
                ));

        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody @Valid RegisterRequestDTO body){
        Optional<User> existingUser = this.repository.findByEmail(body.email());

        if(existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setRole(UserRole.USER);
            newUser.setEnabled(true);
            newUser.setAccountNonLocked(true);
            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register/admin")
    public ResponseEntity<ResponseDTO> registerAdmin(@RequestBody @Valid RegisterRequestDTO body){
        Optional<User> existingUser = this.repository.findByEmail(body.email());

        if(existingUser.isEmpty()) {
            User newAdmin = new User();
            newAdmin.setPassword(passwordEncoder.encode(body.password()));
            newAdmin.setEmail(body.email());
            newAdmin.setName(body.name());
            newAdmin.setRole(UserRole.ADMIN);
            newAdmin.setEnabled(true);
            newAdmin.setAccountNonLocked(true);
            this.repository.save(newAdmin);

            String token = this.tokenService.generateToken(newAdmin);
            return ResponseEntity.ok(new ResponseDTO(newAdmin.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
