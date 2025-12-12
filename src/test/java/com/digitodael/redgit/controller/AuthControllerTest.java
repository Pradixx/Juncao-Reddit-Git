package com.digitodael.redgit.controller;

import com.digitodael.redgit.controllers.AuthController;
import com.digitodael.redgit.infrastructure.entity.User;
import com.digitodael.redgit.infrastructure.repository.UserRepository;
import com.digitodael.redgit.service.TokenService;
import com.digitodael.redgit.controllers.DTO.LoginRequestDTO;
import com.digitodael.redgit.controllers.DTO.RegisterRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private TokenService tokenService;

    private static final String BASE_URL = "/api/auth";

    private LoginRequestDTO loginDTO;
    private RegisterRequestDTO registerDTO;
    private User testUser;
    private final String rawPassword = "rawPassword";
    private final String encodedPassword = "encodedPassword";
    private final String testToken = "test_jwt_token";

    @BeforeEach
    void setup() {
        loginDTO = new LoginRequestDTO("teste@login.com", rawPassword);
        registerDTO = new RegisterRequestDTO("Teste User", "teste@register.com", rawPassword);

        testUser = new User();
        testUser.setEmail(loginDTO.email());
        testUser.setPassword(encodedPassword);
        testUser.setName("Teste User");
    }

    // --- TESTES DE LOGIN ---

    @Test
    @DisplayName("LOGIN: Deve retornar token e 200 OK quando as credenciais estiverem corretas")
    void loginSuccess() throws Exception {

        Mockito.when(userRepository.findByEmail(loginDTO.email())).thenReturn(Optional.of(testUser));
        Mockito.when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);
        Mockito.when(tokenService.generateToken(testUser)).thenReturn(testToken);

        mockMvc.perform(post(BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(testUser.getName()))
                .andExpect(jsonPath("$.token").value(testToken));
    }

    @Test
    @DisplayName("LOGIN: Deve retornar 400 Bad Request quando a senha estiver incorreta")
    void loginFailureIncorrectPassword() throws Exception {

        Mockito.when(userRepository.findByEmail(loginDTO.email())).thenReturn(Optional.of(testUser));
        Mockito.when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(false);

        mockMvc.perform(post(BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO))
                        .with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(""));

        Mockito.verify(tokenService, Mockito.never()).generateToken(any());
    }

    @Test
    @DisplayName("LOGIN: Deve lançar RuntimeException (ou 400) quando o usuário não for encontrado")
    void loginFailureUserNotFound() throws Exception {

        Mockito.when(userRepository.findByEmail(loginDTO.email())).thenReturn(Optional.empty());

        mockMvc.perform(post(BASE_URL + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDTO))
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    // --- TESTES DE REGISTER ---

    @Test
    @DisplayName("REGISTER: Deve criar novo usuário, retornar token e 200 OK quando o e-mail não existe")
    void registerSuccess() throws Exception {
        Mockito.when(userRepository.findByEmail(registerDTO.email())).thenReturn(Optional.empty());
        Mockito.when(passwordEncoder.encode(rawPassword)).thenReturn(encodedPassword);
        Mockito.when(tokenService.generateToken(any(User.class))).thenReturn(testToken);

        mockMvc.perform(post(BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerDTO))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(registerDTO.name()))
                .andExpect(jsonPath("$.token").value(testToken));

        Mockito.verify(userRepository, Mockito.times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("REGISTER: Deve retornar 400 Bad Request quando o e-mail já existe")
    void registerFailureUserExists() throws Exception {
        Mockito.when(userRepository.findByEmail(registerDTO.email())).thenReturn(Optional.of(testUser));

        mockMvc.perform(post(BASE_URL + "/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerDTO))
                        .with(csrf()))
                .andExpect(status().isBadRequest());

        Mockito.verify(userRepository, Mockito.never()).save(any());
    }
}
