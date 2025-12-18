package com.redgit.registry.ideashub.repository;

import com.redgit.registry.ideashub.infrastructure.entities.Idea;
import com.redgit.registry.ideashub.infrastructure.repository.IdeaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class IdeaRepositoryTest {

    @Autowired
    private IdeaRepository ideaRepository;

    @Test
    void saveIdea_shouldPersist() {
        Idea idea = new Idea();
        idea.setTitle("Repo Test");
        idea.setAuthorId("user123");

        Idea saved = ideaRepository.save(idea);
        assertNotNull(saved.getId());
        assertEquals("Repo Test", saved.getTitle());
    }
}
