package com.redgit.registry.ideashub.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redgit.registry.ideashub.controller.dto.IdeaDTO;
import com.redgit.registry.ideashub.infrastructure.entities.Idea;
import com.redgit.registry.ideashub.service.IdeaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("IdeaController Unit Tests")
class IdeaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private IdeaService ideaService;

    @InjectMocks
    private IdeaController ideaController;

    private ObjectMapper objectMapper;
    private Idea testIdea;
    private IdeaDTO testDTO;

    // Usando lambda para simular Principal de forma mais simples
    private java.security.Principal mockPrincipal;
    private java.security.Principal otherPrincipal;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(ideaController).build();
        objectMapper = new ObjectMapper();

        testIdea = new Idea();
        testIdea.setId("test-id-123");
        testIdea.setTitle("Test Idea");
        testIdea.setDescription("Test Description");
        testIdea.setAuthorId("user@test.com");
        testIdea.setCreatedAt(LocalDateTime.now());

        testDTO = new IdeaDTO();
        testDTO.setTitle("New Idea");
        testDTO.setDescription("New Description");

        // Mock do Principal - simula o @AuthenticationPrincipal
        mockPrincipal = () -> "user@test.com";
        otherPrincipal = () -> "other@test.com";
    }

    @Nested
    @DisplayName("POST /api/ideas - createIdea")
    class CreateIdeaTests {

        @Test
        @DisplayName("Deve criar ideia e retornar 201 Created")
        void createIdea_withValidData_shouldReturn201() throws Exception {
            // Arrange
            when(ideaService.createIdea(any(IdeaDTO.class))).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(post("/api/ideas")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(mockPrincipal))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").value("test-id-123"))
                    .andExpect(jsonPath("$.title").value("Test Idea"))
                    .andExpect(jsonPath("$.description").value("Test Description"))
                    .andExpect(jsonPath("$.authorId").value("user@test.com"));

            verify(ideaService, times(1)).createIdea(any(IdeaDTO.class));
        }

        @Test
        @DisplayName("Deve definir authorId automaticamente do principal")
        void createIdea_shouldSetAuthorIdFromPrincipal() throws Exception {
            // Arrange
            when(ideaService.createIdea(any(IdeaDTO.class))).thenReturn(testIdea);

            // Act
            mockMvc.perform(post("/api/ideas")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(mockPrincipal))
                    .andExpect(status().isCreated());

            // Assert - verifica que o DTO foi modificado com o authorId
            verify(ideaService).createIdea(argThat(dto ->
                    "user@test.com".equals(dto.getAuthorId())
            ));
        }

        @Test
        @DisplayName("Deve retornar Content-Type application/json")
        void createIdea_shouldReturnJsonContentType() throws Exception {
            // Arrange
            when(ideaService.createIdea(any(IdeaDTO.class))).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(post("/api/ideas")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(mockPrincipal))
                    .andExpect(status().isCreated())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        }
    }

    @Nested
    @DisplayName("GET /api/ideas - getAllIdeas")
    class GetAllIdeasTests {

        @Test
        @DisplayName("Deve retornar todas as ideias com status 200")
        void getAllIdeas_shouldReturn200() throws Exception {
            // Arrange
            Idea idea2 = new Idea();
            idea2.setId("test-id-456");
            idea2.setTitle("Another Idea");
            idea2.setDescription("Another Description");
            idea2.setAuthorId("another@test.com");

            List<Idea> ideas = Arrays.asList(testIdea, idea2);
            when(ideaService.getAllIdeas()).thenReturn(ideas);

            // Act & Assert
            mockMvc.perform(get("/api/ideas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value("test-id-123"))
                    .andExpect(jsonPath("$[0].title").value("Test Idea"))
                    .andExpect(jsonPath("$[1].id").value("test-id-456"))
                    .andExpect(jsonPath("$[1].title").value("Another Idea"));

            verify(ideaService, times(1)).getAllIdeas();
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há ideias")
        void getAllIdeas_whenEmpty_shouldReturnEmptyArray() throws Exception {
            // Arrange
            when(ideaService.getAllIdeas()).thenReturn(Arrays.asList());

            // Act & Assert
            mockMvc.perform(get("/api/ideas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/ideas/{id} - getIdeaById")
    class GetIdeaByIdTests {

        @Test
        @DisplayName("Deve retornar ideia por ID com status 200")
        void getIdeaById_whenExists_shouldReturn200() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(get("/api/ideas/test-id-123"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value("test-id-123"))
                    .andExpect(jsonPath("$.title").value("Test Idea"));

            verify(ideaService, times(1)).findById("test-id-123");
        }

        @Test
        @DisplayName("Deve chamar service com ID correto")
        void getIdeaById_shouldCallServiceWithCorrectId() throws Exception {
            // Arrange
            when(ideaService.findById(anyString())).thenReturn(testIdea);

            // Act
            mockMvc.perform(get("/api/ideas/specific-id-789"))
                    .andExpect(status().isOk());

            // Assert
            verify(ideaService).findById("specific-id-789");
        }
    }

    @Nested
    @DisplayName("GET /api/ideas/my-ideas - getMyIdeas")
    class GetMyIdeasTests {

        @Test
        @DisplayName("Deve retornar apenas ideias do usuário autenticado")
        void getMyIdeas_shouldReturnUserIdeas() throws Exception {
            // Arrange
            List<Idea> myIdeas = Arrays.asList(testIdea);
            when(ideaService.getIdeasByAuthor("user@test.com")).thenReturn(myIdeas);

            // Act & Assert
            mockMvc.perform(get("/api/ideas/my-ideas")
                            .principal(mockPrincipal))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].authorId").value("user@test.com"));

            verify(ideaService, times(1)).getIdeasByAuthor("user@test.com");
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando usuário não tem ideias")
        void getMyIdeas_whenNoIdeas_shouldReturnEmptyArray() throws Exception {
            // Arrange
            when(ideaService.getIdeasByAuthor("user@test.com")).thenReturn(Arrays.asList());

            // Act & Assert
            mockMvc.perform(get("/api/ideas/my-ideas")
                            .principal(mockPrincipal))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/ideas/author/{authorId} - getIdeasByAuthor")
    class GetIdeasByAuthorTests {

        @Test
        @DisplayName("Deve retornar ideias do autor especificado")
        void getIdeasByAuthor_shouldReturnAuthorIdeas() throws Exception {
            // Arrange
            List<Idea> authorIdeas = Arrays.asList(testIdea);
            when(ideaService.getIdeasByAuthor("user@test.com")).thenReturn(authorIdeas);

            // Act & Assert
            mockMvc.perform(get("/api/ideas/author/user@test.com"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].authorId").value("user@test.com"));

            verify(ideaService, times(1)).getIdeasByAuthor("user@test.com");
        }
    }

    @Nested
    @DisplayName("PUT /api/ideas/{id} - replaceIdea")
    class ReplaceIdeaTests {

        @Test
        @DisplayName("Autor pode atualizar sua própria ideia - 200")
        void replaceIdea_asAuthor_shouldReturn200() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);
            when(ideaService.replaceIdea(anyString(), any(IdeaDTO.class))).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(put("/api/ideas/test-id-123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(mockPrincipal))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value("test-id-123"));

            verify(ideaService, times(1)).findById("test-id-123");
            verify(ideaService, times(1)).replaceIdea(anyString(), any(IdeaDTO.class));
        }

        @Test
        @DisplayName("Não-autor não pode atualizar ideia - 403")
        void replaceIdea_asNonAuthor_shouldReturn403() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(put("/api/ideas/test-id-123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(otherPrincipal))
                    .andExpect(status().isForbidden());

            verify(ideaService, times(1)).findById("test-id-123");
            verify(ideaService, never()).replaceIdea(anyString(), any(IdeaDTO.class));
        }

        @Test
        @DisplayName("Deve verificar autoria antes de atualizar")
        void replaceIdea_shouldCheckOwnershipBeforeUpdate() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act
            mockMvc.perform(put("/api/ideas/test-id-123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(testDTO))
                            .principal(otherPrincipal))
                    .andExpect(status().isForbidden());

            // Assert - verify findById foi chamado mas replaceIdea não
            verify(ideaService).findById("test-id-123");
            verify(ideaService, never()).replaceIdea(anyString(), any());
        }
    }

    @Nested
    @DisplayName("PATCH /api/ideas/{id} - updateIdea")
    class UpdateIdeaTests {

        @Test
        @DisplayName("Autor pode fazer update parcial - 200")
        void updateIdea_asAuthor_shouldReturn200() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);
            when(ideaService.updateIdea(anyString(), any(IdeaDTO.class))).thenReturn(testIdea);

            IdeaDTO partialDTO = new IdeaDTO();
            partialDTO.setTitle("Updated Title Only");

            // Act & Assert
            mockMvc.perform(patch("/api/ideas/test-id-123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(partialDTO))
                            .principal(mockPrincipal))
                    .andExpect(status().isOk());

            verify(ideaService, times(1)).updateIdea(anyString(), any(IdeaDTO.class));
        }

        @Test
        @DisplayName("Não-autor não pode fazer update parcial - 403")
        void updateIdea_asNonAuthor_shouldReturn403() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            IdeaDTO partialDTO = new IdeaDTO();
            partialDTO.setTitle("Updated Title");

            // Act & Assert
            mockMvc.perform(patch("/api/ideas/test-id-123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(partialDTO))
                            .principal(otherPrincipal))
                    .andExpect(status().isForbidden());

            verify(ideaService, never()).updateIdea(anyString(), any(IdeaDTO.class));
        }
    }

    @Nested
    @DisplayName("DELETE /api/ideas/{id} - deleteIdea")
    class DeleteIdeaTests {

        @Test
        @DisplayName("Autor pode deletar sua própria ideia - 204")
        void deleteIdea_asAuthor_shouldReturn204() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);
            doNothing().when(ideaService).deleteIdeaById("test-id-123");

            // Act & Assert
            mockMvc.perform(delete("/api/ideas/test-id-123")
                            .principal(mockPrincipal))
                    .andExpect(status().isNoContent());

            verify(ideaService, times(1)).findById("test-id-123");
            verify(ideaService, times(1)).deleteIdeaById("test-id-123");
        }

        @Test
        @DisplayName("Não-autor não pode deletar ideia - 403")
        void deleteIdea_asNonAuthor_shouldReturn403() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(delete("/api/ideas/test-id-123")
                            .principal(otherPrincipal))
                    .andExpect(status().isForbidden());

            verify(ideaService, times(1)).findById("test-id-123");
            verify(ideaService, never()).deleteIdeaById(anyString());
        }

        @Test
        @DisplayName("Deve verificar autoria antes de deletar")
        void deleteIdea_shouldCheckOwnershipBeforeDelete() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act
            mockMvc.perform(delete("/api/ideas/test-id-123")
                            .principal(otherPrincipal))
                    .andExpect(status().isForbidden());

            // Assert
            verify(ideaService).findById("test-id-123");
            verify(ideaService, never()).deleteIdeaById(anyString());
        }

        @Test
        @DisplayName("Não deve ter corpo na resposta 204")
        void deleteIdea_shouldNotReturnBody() throws Exception {
            // Arrange
            when(ideaService.findById("test-id-123")).thenReturn(testIdea);

            // Act & Assert
            mockMvc.perform(delete("/api/ideas/test-id-123")
                            .principal(mockPrincipal))
                    .andExpect(status().isNoContent())
                    .andExpect(jsonPath("$").doesNotExist());
        }
    }
}