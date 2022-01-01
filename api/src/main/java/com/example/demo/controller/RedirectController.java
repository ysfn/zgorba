package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RedirectController {
    @Value("${app.logout.redirect-url}")
    String targetUrl;
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView method() {
        return new ModelAndView("redirect:" + targetUrl);
    }
}
