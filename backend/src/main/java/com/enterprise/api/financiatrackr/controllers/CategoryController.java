package com.enterprise.api.financiatrackr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.Category;
import com.enterprise.api.financiatrackr.event.CreatedResourceEvent;
import com.enterprise.api.financiatrackr.repositories.CategoryRepository;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Category> create(@Valid @RequestBody Category category, HttpServletResponse response) {
        Category savedCategory = categoryRepository.save(category);
        publisher.publishEvent(new CreatedResourceEvent(this, response, savedCategory.getId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return (category != null) ? ResponseEntity.ok(category) : ResponseEntity.notFound().build();
    }
}
