package com.enterprise.api.financiatrackr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.api.financiatrackr.entities.State;

public interface StateRepository extends JpaRepository<State, Long>{
    
}
