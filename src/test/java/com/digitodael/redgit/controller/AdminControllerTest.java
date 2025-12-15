package com.digitodael.redgit.controller;

import com.digitodael.redgit.controllers.AdminController;
import com.digitodael.redgit.controllers.DTO.UserDTO;
import com.digitodael.redgit.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdminController.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Nested
    @DisplayName("Autorização de ADMIN")
    class AdminAuthorizationTests {

        @Test
        @DisplayName("USER não pode acessar /api/admin")
        @WithMockUser(username = "user@test.com", roles = {"USER"})
        void getAllUsers_AsUser_Returns403() throws Exception {
            mockMvc.perform(get("/api/admin/users"))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("ADMIN pode acessar /api/admin")
        @WithMockUser(username = "admin@test.com", roles = {"ADMIN"})
        void getAllUsers_AsAdmin_Returns200() throws Exception {
            Page<UserDTO> emptyPage = new PageImpl<>(Collections.emptyList());
            when(userService.findAll(any(Pageable.class))).thenReturn(emptyPage);

            mockMvc.perform(get("/api/admin/users"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isArray());
        }

        @Test
        @DisplayName("Sem autenticação retorna 401")
        void getAllUsers_WithoutAuth_Returns401() throws Exception {
            mockMvc.perform(get("/api/admin/users"))
                    .andExpect(status().isUnauthorized());
        }
    }
}
