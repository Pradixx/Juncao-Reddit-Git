package com.daniel.registry.ideashub.infrastructure.repository;

import com.daniel.registry.ideashub.infrastructure.entities.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdeaRepository extends MongoRepository<Idea, String> { }
