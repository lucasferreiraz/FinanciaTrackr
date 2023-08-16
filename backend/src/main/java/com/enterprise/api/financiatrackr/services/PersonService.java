package com.enterprise.api.financiatrackr.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.enterprise.api.financiatrackr.entities.Person;
import com.enterprise.api.financiatrackr.repositories.PersonRepository;

import jakarta.validation.Valid;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;
    
    public Person save(@Valid Person person) {
        person.getContacts().forEach(c -> c.setPerson(person));
		return personRepository.save(person);
    }

    public Person update(Long id, @Valid Person person) {
        Person savedPerson = findPersonById(id);

        savedPerson.getContacts().clear();
		savedPerson.getContacts().addAll(person.getContacts());
		savedPerson.getContacts().forEach(c -> c.setPerson(savedPerson));

        BeanUtils.copyProperties(person, savedPerson, "id", "contacts");
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
