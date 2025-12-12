package com.daniel.registry.ideashub.controller;

import com.daniel.registry.ideashub.dto.IdeaDTO;
import com.daniel.registry.ideashub.infrastructure.entities.Idea;
import com.daniel.registry.ideashub.service.IdeaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class IdeaControllerTest {

    private MockMvc mockMvc;

    @Mock
    private IdeaService ideaService;

    @InjectMocks
    private IdeaController ideaController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ideaController).build();
    }

    @Test
    void createIdea_shouldReturnOk() throws Exception {
        IdeaDTO ideaDTO = new IdeaDTO();
        ideaDTO.setTitle("New Idea");
        ideaDTO.setAuthorId("user123");

        Idea saved = new Idea();
        saved.setTitle(ideaDTO.getTitle());
        saved.setAuthorId(ideaDTO.getAuthorId());

        when(ideaService.createIdea(any(IdeaDTO.class))).thenReturn(saved);

        mockMvc.perform(post("/ideas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"New Idea\", \"authorId\":\"user123\"}"))
                .andExpect(status().isOk());
    }
}
