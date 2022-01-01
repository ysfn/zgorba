package com.example.demo.controller;

import lombok.Data;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;

@RestController
public class UserController {

    @GetMapping("/user")
    public BooUser user(@AuthenticationPrincipal OAuth2User principal) {
        final String name = principal.getAttribute("name").toString();
        final String email =  principal.getAttribute("email").toString();
        final String pictureUrl = principal.getAttribute("picture").toString();
        return new BooUser(name,email,pictureUrl);
    }

    @Data
    public static class BooUser implements Serializable {
        final private String name;
        final private String email;
        final private String pictureUrl;
    }
}
