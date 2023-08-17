package com.enterprise.api.financiatrackr.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.State;
import com.enterprise.api.financiatrackr.repositories.StateRepository;

@RestController
@RequestMapping("/states")
public class StateController {
    
    @Autowired
    private StateRepository stateRepository;

    @GetMapping
	public List<State> getAll() {
		return stateRepository.findAll();
	}

}
