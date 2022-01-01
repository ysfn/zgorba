package com.example.demo.service;

import com.example.demo.entity.Profile;
import com.example.demo.repository.ProfileRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Log4j2
@Service
public class ProfileService {
    private final ApplicationEventPublisher publisher;
    private final ProfileRepository repository;

    public ProfileService(ApplicationEventPublisher publisher, ProfileRepository repository) {
        this.publisher = publisher;
        this.repository = repository;
    }

    public Flux<Profile> all() {
        return this.repository.findAll();
    }

    public Mono<Profile> get(String id) {
        return this.repository.findById(id);
    }

    public Mono<Profile> update(String id, String email) {
        return this.repository.findById(id)
                .map(profile -> new Profile(profile.getId(), email))
                .flatMap(this.repository::save);
    }

    public Mono<Profile> delete(String id) {
        return this.repository
                .findById(id)
                .flatMap(profile -> this.repository.deleteById(profile.getId()).thenReturn(profile));
    }

    public Mono<Profile> create(String email) {
        return this.repository
                .save(new Profile(UUID.randomUUID().toString(), email));
               // .doOnSuccess(entity -> this.publisher.publishEvent(new ProfileCreatedEvent(entity)));
    }






}
