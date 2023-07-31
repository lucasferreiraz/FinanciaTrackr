package com.enterprise.api.financiatrackr.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.Expenditure;
import com.enterprise.api.financiatrackr.event.CreatedResourceEvent;
import com.enterprise.api.financiatrackr.repositories.ExpenditureRepository;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditureResume;
import com.enterprise.api.financiatrackr.services.ExpenditureService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/expenditures")
public class ExpenditureController {

    @Autowired
    private ExpenditureRepository expenditureRepository;

    @Autowired
    private ExpenditureService expenditureService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping
    public Page<Expenditure> getAll(
        @RequestParam(value = "minDueDate", defaultValue = "") String minDueDate,      
        @RequestParam(value = "maxDueDate", defaultValue = "") String maxDueDate,
        @RequestParam(value = "description", defaultValue = "") String description,
        Pageable pageable
    ) {
        return expenditureService.searchAll(minDueDate, maxDueDate, description, pageable);
    }

    @GetMapping(params = "resume")
    public List<ExpenditureResume> getAll() {
        return expenditureRepository.resume();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expenditure> findById(@PathVariable Long id) {
        Optional<Expenditure> expenditure = expenditureRepository.findById(id);
        return expenditure.isPresent() ? ResponseEntity.ok(expenditure.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Expenditure> create(@Valid @RequestBody Expenditure expenditure,
            HttpServletResponse response) {
        Expenditure savedExpenditure = expenditureService.save(expenditure);
        publisher.publishEvent(new CreatedResourceEvent(this, response, savedExpenditure.getId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpenditure);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenditureRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
