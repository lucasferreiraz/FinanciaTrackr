package com.enterprise.api.financiatrackr.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.enterprise.api.financiatrackr.entities.Person;
import com.enterprise.api.financiatrackr.repositories.PersonRepository;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person update(Long id, Person person) {
        Person savedPerson = findPersonById(id);

        BeanUtils.copyProperties(person, savedPerson, "id");
        return personRepository.save(savedPerson);
    }

    public void updateActiveProperty(Long id, Boolean active) {
        Person savedPerson = findPersonById(id);
        savedPerson.setActive(active);
        personRepository.save(savedPerson);
    }

    public Person findPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new EmptyResultDataAccessException(1));
    }
}
