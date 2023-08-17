package com.enterprise.api.financiatrackr.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enterprise.api.financiatrackr.entities.City;

public interface CityRepository extends JpaRepository<City, Long>{
    List<City> findByStateId(Long id);
}
