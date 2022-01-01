package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Component;

@Configuration
public class Oauth2Config extends WebSecurityConfigurerAdapter {

    @Autowired
    private Oauth2AuthenticationSuccessfulHandler oAuth2AuthenticationSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests(a -> a
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .logout(l -> l.logoutSuccessUrl("/").permitAll())
                .csrf(c -> c.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .oauth2Login()
                .successHandler(oAuth2AuthenticationSuccessHandler);
    }
}

@Component
class Oauth2AuthenticationSuccessfulHandler extends SimpleUrlAuthenticationSuccessHandler {

    public Oauth2AuthenticationSuccessfulHandler(@Value("${app.login.redirect-url}") String redirectUrl) {
        super(redirectUrl);
    }
}