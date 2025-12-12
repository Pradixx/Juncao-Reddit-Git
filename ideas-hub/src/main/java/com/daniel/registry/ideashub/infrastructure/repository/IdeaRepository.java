package com.daniel.registry.ideashub.infrastructure.repository;

import com.daniel.registry.ideashub.infrastructure.entities.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends MongoRepository<Idea, String> {
    List<Idea> findByAuthorId(String authorId);
}
