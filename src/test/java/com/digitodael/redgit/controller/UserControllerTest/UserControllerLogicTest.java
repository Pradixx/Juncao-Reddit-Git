package com.digitodael.redgit.controller.UserControllerTest;

import com.digitodael.redgit.controllers.UserController;
import com.digitodael.redgit.infrastructure.repository.UserRepository;
import com.digitodael.redgit.service.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Testes da lógica do UserController sem validações de segurança
 * (filtros desabilitados para testar apenas o comportamento do controller)
 */

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerLogicTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private UserRepository userRepository;

    private static final String BASE_URL = "/api/user";

    // ===== TESTES DE LÓGICA DO ENDPOINT =====

    @Test
    @DisplayName("Deve retornar 200 OK com mensagem 'sucesso!'")
    void getUserSuccess() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().string("sucesso!"));
    }

    @Test
    @DisplayName("Deve retornar Content-Type text/plain")
    void getUserResponseContentType() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().contentType("text/plain;charset=UTF-8"));
    }

    // ===== TESTES DE MÉTODOS HTTP NÃO PERMITIDOS =====

    @Test
    @DisplayName("Deve retornar 405 Method Not Allowed para POST")
    void postUserMethodNotAllowed() throws Exception {
        mockMvc.perform(post(BASE_URL))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DisplayName("Deve retornar 405 Method Not Allowed para PUT")
    void putUserMethodNotAllowed() throws Exception {
        mockMvc.perform(put(BASE_URL))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DisplayName("Deve retornar 405 Method Not Allowed para DELETE")
    void deleteUserMethodNotAllowed() throws Exception {
        mockMvc.perform(delete(BASE_URL))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DisplayName("Deve retornar 405 Method Not Allowed para PATCH")
    void patchUserMethodNotAllowed() throws Exception {
        mockMvc.perform(patch(BASE_URL))
                .andExpect(status().isMethodNotAllowed());
    }

    // ===== TESTES DE HEADERS =====

    @Test
    @DisplayName("Deve processar requisição sem headers adicionais")
    void getUserWithoutAdditionalHeaders() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().string("sucesso!"));
    }

    @Test
    @DisplayName("Deve processar requisição com Accept header")
    void getUserWithAcceptHeader() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .header("Accept", "text/plain"))
                .andExpect(status().isOk())
                .andExpect(content().string("sucesso!"));
    }

    // ===== TESTES DE QUERY PARAMETERS =====

    @Test
    @DisplayName("Deve ignorar query parameters não utilizados")
    void getUserWithQueryParameters() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .param("unused", "value"))
                .andExpect(status().isOk())
                .andExpect(content().string("sucesso!"));
    }

    // ===== TESTES DE ENCODING =====

    @Test
    @DisplayName("Deve retornar resposta com charset UTF-8")
    void getUserResponseCharset() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(content().encoding("UTF-8"));
    }
}
