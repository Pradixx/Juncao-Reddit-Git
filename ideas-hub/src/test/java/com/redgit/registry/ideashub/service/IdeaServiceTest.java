package com.redgit.registry.ideashub.service;

import com.redgit.registry.ideashub.controller.dto.IdeaDTO;
import com.redgit.registry.ideashub.infrastructure.entities.Idea;
import com.redgit.registry.ideashub.infrastructure.repository.IdeaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IdeaServiceTest {

    @Mock
    private IdeaRepository ideaRepository;

    @InjectMocks
    private IdeaService ideaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createIdea_shouldReturnSavedIdea() {
        IdeaDTO ideaDTO = new IdeaDTO();
        ideaDTO.setTitle("Test Idea");
        ideaDTO.setAuthorId("user123");

        Idea saved = new Idea();
        saved.setTitle("Test Idea");
        saved.setAuthorId("user123");

        when(ideaRepository.save(any(Idea.class))).thenReturn(saved);

        Idea result = ideaService.createIdea(ideaDTO);

        assertNotNull(result);
        assertEquals("Test Idea", result.getTitle());
        assertEquals("user123", result.getAuthorId());
    }
}
