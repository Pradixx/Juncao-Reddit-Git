package com.daniel.registry.ideashub.controller;

import com.daniel.registry.ideashub.dto.IdeaDTO;
import com.daniel.registry.ideashub.infrastructure.entities.Idea;
import com.daniel.registry.ideashub.service.IdeaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@RequiredArgsConstructor
public class IdeaController {

    private final IdeaService ideaService;

    @PostMapping
    public ResponseEntity<Idea> createIdea(@Validated @RequestBody IdeaDTO ideaDTO){
        Idea created = ideaService.createIdea(ideaDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Idea>> getAllIdeas(){
        return ResponseEntity.ok(ideaService.getAllIdeas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable String id){
        return ResponseEntity.ok(ideaService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idea> replaceIdea(@PathVariable String id,
                                            @Validated @RequestBody IdeaDTO ideaDTO) {
        Idea updated = ideaService.replaceIdea(id, ideaDTO);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable String id,
                                           @RequestBody IdeaDTO ideaDTO) {
        Idea updated = ideaService.updateIdea(id, ideaDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletIdea(@PathVariable String id){
        ideaService.deleteIdeaById(id);
        return ResponseEntity.noContent().build();
    }
}
