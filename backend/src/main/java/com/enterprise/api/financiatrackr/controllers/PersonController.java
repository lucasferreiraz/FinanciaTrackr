package com.enterprise.api.financiatrackr.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enterprise.api.financiatrackr.entities.Person;
import com.enterprise.api.financiatrackr.event.CreatedResourceEvent;
import com.enterprise.api.financiatrackr.repositories.PersonRepository;
import com.enterprise.api.financiatrackr.services.PersonService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/persons")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<Person> getAll() {
        return personRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Person> create(@Valid @RequestBody Person person, HttpServletResponse response) {
        Person savedPerson = personRepository.save(person);
        publisher.publishEvent(new CreatedResourceEvent(this, response, savedPerson.getId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> findById(@PathVariable Long id) {
        Optional<Person> person = personRepository.findById(id);
        return person.isPresent() ? ResponseEntity.ok(person.get()) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable Long id, @Valid @RequestBody Person person) {
        Person savedPerson = personService.update(id, person);
        return ResponseEntity.ok(savedPerson);
    }

    @PutMapping("/{id}/active")
    public ResponseEntity<Void> updateActiveProperty(@PathVariable Long id, @RequestBody Boolean active) {
        personService.updateActiveProperty(id, active);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
