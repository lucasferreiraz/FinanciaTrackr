package com.enterprise.api.financiatrackr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.api.financiatrackr.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
