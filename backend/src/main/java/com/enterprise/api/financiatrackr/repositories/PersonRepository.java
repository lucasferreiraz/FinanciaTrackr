package com.enterprise.api.financiatrackr.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.api.financiatrackr.entities.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    
    Page<Person> findByNameContainingOrderById(String name, Pageable pageable);

}
