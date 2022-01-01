package com.example.demo.repository;

import com.example.demo.entity.Profile;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ProfileRepository extends ReactiveCrudRepository<Profile, String> {
}
