package com.enterprise.api.financiatrackr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.City;
import com.enterprise.api.financiatrackr.repositories.CityRepository;

@RestController
@RequestMapping("/cities")
public class CityController {
    
    @Autowired
	private CityRepository cityRepository;
	
	@GetMapping
	public List<City> search(@RequestParam Long stateId) {
		return cityRepository.findByStateId(stateId);
	}
    
}
