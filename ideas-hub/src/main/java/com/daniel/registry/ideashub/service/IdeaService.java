package com.daniel.registry.ideashub.service;

import com.daniel.registry.ideashub.dto.IdeaDTO;
import com.daniel.registry.ideashub.infrastructure.entities.Idea;
import com.daniel.registry.ideashub.infrastructure.repository.IdeaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdeaService {

    private final IdeaRepository ideaRepository;

    public Idea createIdea(IdeaDTO ideaDTO){
        Idea idea = new Idea();
        idea.setTitle(ideaDTO.getTitle());
        idea.setDescription(ideaDTO.getDescription());
        idea.setAuthorId(idea.getAuthorId());
        idea.setCreatedAt(idea.getCreatedAt());
        return ideaRepository.save(idea);
    }
    public List<Idea> getAllIdeas(){
        return ideaRepository.findAll();
    }
    public Idea findById(String id){
        return ideaRepository.findById(id).orElseThrow(
                () -> new RuntimeException("id não encontrado")
        );
    }
    public Idea replaceIdea(String id, IdeaDTO ideaDTO){
        Idea existing = findById(id);
        existing.setTitle(ideaDTO.getTitle());
        existing.setDescription(ideaDTO.getDescription());
        return ideaRepository.save(existing);
    }
    public Idea updateIdea(String id, IdeaDTO ideaDTO) {
        Idea existing = findById(id);
        if (ideaDTO.getTitle() != null) existing.setTitle(ideaDTO.getTitle());
        if (ideaDTO.getDescription() != null) existing.setDescription(ideaDTO.getDescription());
        return ideaRepository.save(existing);
    }
    public void deleteIdeaById(String id) {
        ideaRepository.deleteById(id);
    }
}
