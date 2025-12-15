package com.digitodael.redgit.controller.UserControllerTest;

import com.digitodael.redgit.controllers.UserController;
import com.digitodael.redgit.infrastructure.entity.User;
import com.digitodael.redgit.infrastructure.entity.UserRole;
import com.digitodael.redgit.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Nested
    @DisplayName("Autenticação")
    class AuthenticationTests {

        @Test
        @DisplayName("GET /api/user/me sem autenticação retorna 401")
        void getCurrentUser_WithoutAuth_Returns401() throws Exception {
            mockMvc.perform(get("/api/user/me"))
                    .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("GET /api/user/me com autenticação retorna 200")
        @WithMockUser(username = "user@test.com", roles = {"USER"})
        void getCurrentUser_WithAuth_Returns200() throws Exception {
            User user = new User();
            user.setId(UUID.randomUUID());
            user.setEmail("user@test.com");
            user.setName("Test User");
            user.setRole(UserRole.USER);

            when(userService.findByEmail("user@test.com")).thenReturn(user);

            mockMvc.perform(get("/api/user/me"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.email").value("user@test.com"));
        }
    }

    @Nested
    @DisplayName("Autorização")
    class AuthorizationTests {

        @Test
        @DisplayName("USER pode acessar seu próprio perfil")
        @WithMockUser(username = "user@test.com", roles = {"USER"})
        void getUser_AsOwner_Returns200() throws Exception {
            UUID userId = UUID.randomUUID();
            User user = new User();
            user.setId(userId);
            user.setEmail("user@test.com");
            user.setRole(UserRole.USER);

            when(userService.findById(userId)).thenReturn(user);

            mockMvc.perform(get("/api/user/" + userId))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("USER não pode acessar perfil de outro usuário")
        @WithMockUser(username = "user1@test.com", roles = {"USER"})
        void getUser_AsNonOwner_Returns403() throws Exception {
            UUID otherUserId = UUID.randomUUID();

            mockMvc.perform(get("/api/user/" + otherUserId))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("ADMIN pode acessar qualquer perfil")
        @WithMockUser(username = "admin@test.com", roles = {"ADMIN"})
        void getUser_AsAdmin_Returns200() throws Exception {
            UUID anyUserId = UUID.randomUUID();
            User user = new User();
            user.setId(anyUserId);
            user.setEmail("other@test.com");
            user.setRole(UserRole.USER);

            when(userService.findById(anyUserId)).thenReturn(user);

            mockMvc.perform(get("/api/user/" + anyUserId))
                    .andExpect(status().isOk());
        }
    }
}
