package com.example.demo;

import com.example.demo.entity.Profile;
import com.example.demo.repository.ProfileRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.util.UUID;

@Log4j2
@Component
@org.springframework.context.annotation.Profile("demo")
public class SampleDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final ProfileRepository repository;

    public SampleDataInitializer(ProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        repository
                .deleteAll()
                .thenMany(
                        Flux
                                .just("A", "B", "C", "D")
                                .map(name -> new Profile(UUID.randomUUID().toString(), name + "@email.com"))
                                .flatMap(e -> {System.out.println(e);return repository.save(e);})
                                //.map(e -> {log.info("saving - " + e.toString()); return e;})
                        )
                .thenMany(repository.findAll())
                .subscribe(profile -> log.info("saving - " + profile.toString()));;
               //
               //
    }
}
