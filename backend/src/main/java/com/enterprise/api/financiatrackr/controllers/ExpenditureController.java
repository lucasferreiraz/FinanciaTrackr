package com.enterprise.api.financiatrackr.controllers;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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


	@GetMapping("/reports/by-person")
	public ResponseEntity<byte[]> reportByPerson(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) throws Exception {
		byte[] report = expenditureService.reportByPerson(startDate, endDate);

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
				.body(report);
	}

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
    public Page<ExpenditureResume> getAllResumed(
        @RequestParam(value = "minDueDate", defaultValue = "") String minDueDate,      
        @RequestParam(value = "maxDueDate", defaultValue = "") String maxDueDate,
        @RequestParam(value = "description", defaultValue = "") String description,
        Pageable pageable
    ) {
        return expenditureService.searchAllResumed(minDueDate, maxDueDate, description, pageable);
    }

    @GetMapping("/statistics/by-category")
    public ResponseEntity<?> byCategory() {
        LocalDate firstDay = LocalDate.of(2023, 1, 1);
		LocalDate lastDay = LocalDate.of(2023, 12, 31);
        return ResponseEntity.ok(expenditureRepository.byCategory(firstDay, lastDay));
    }

    @GetMapping("/statistics/by-day")
    public ResponseEntity<?> byDay() {
        LocalDate firstDay = LocalDate.of(2023, 1, 1);
		LocalDate lastDay = LocalDate.of(2023, 12, 31);
        return ResponseEntity.ok(expenditureRepository.byDay(firstDay, lastDay));
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

	@PutMapping("/{id}")
	public ResponseEntity<Expenditure> atualizar(@PathVariable Long id, @Valid @RequestBody Expenditure expenditure) {
		try {
			Expenditure savedExpenditure = expenditureService.update(id, expenditure);
			return ResponseEntity.ok(savedExpenditure);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	} 

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenditureRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
