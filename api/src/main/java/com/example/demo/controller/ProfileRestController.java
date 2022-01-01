package com.example.demo.controller;

import com.example.demo.entity.Profile;
import com.example.demo.service.ProfileService;
import org.reactivestreams.Publisher;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.net.URI;

@RestController
@RequestMapping(value = "/profiles", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProfileRestController {

    private final MediaType mediaType = MediaType.APPLICATION_JSON;
    private final ProfileService profileRepository;

    public ProfileRestController(ProfileService profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    Publisher<Profile> getAll() {
        return profileRepository.all();
    }

    @GetMapping("/{id}")
    Publisher<Profile> getById(@PathVariable("id") String id) {
        return this.profileRepository.get(id);
    }

    @PostMapping
    Publisher<ResponseEntity<Profile>> create(@RequestBody Profile profile) {
        return this.profileRepository
                .create(profile.getEmail())
                .map(p -> ResponseEntity.created(URI.create("/prf/" + p.getId()))
                        .contentType(mediaType)
                        .build());
    }

    @DeleteMapping("/{id}")
    Publisher<Profile> deleteByid(@PathVariable String id){
        return this.profileRepository.delete(id);
    }

    @PutMapping("/{id}")
    Publisher<ResponseEntity<Profile>> updateById(@PathVariable String id, @RequestBody Profile profile) {
        return Mono.just(profile)
                .flatMap(p -> this.profileRepository.update(id,p.getEmail()))
                .map(p -> ResponseEntity.ok()
                        .contentType(this.mediaType)
                        .build());
    }
}
