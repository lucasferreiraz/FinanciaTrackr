package com.enterprise.api.financiatrackr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.api.financiatrackr.entities.Expenditure;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long>{
    
}
