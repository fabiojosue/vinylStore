package com.example.backend.repository;

import com.example.backend.entity.Vinyl;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylRepository extends MongoRepository<Vinyl, String> {
}

