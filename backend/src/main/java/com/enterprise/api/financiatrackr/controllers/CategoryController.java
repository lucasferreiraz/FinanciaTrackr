package com.enterprise.api.financiatrackr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.Category;
import com.enterprise.api.financiatrackr.repositories.CategoryRepository;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @GetMapping
    public List<Category> getAll() { 
        return categoryRepository.findAll();
    }
}
