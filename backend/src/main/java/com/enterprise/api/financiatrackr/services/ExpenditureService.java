package com.enterprise.api.financiatrackr.services;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.enterprise.api.financiatrackr.entities.Expenditure;
import com.enterprise.api.financiatrackr.entities.Person;
import com.enterprise.api.financiatrackr.repositories.ExpenditureRepository;
import com.enterprise.api.financiatrackr.repositories.PersonRepository;
import com.enterprise.api.financiatrackr.services.exceptions.NonExistentOrInativePersonException;

@Service
public class ExpenditureService {

    @Autowired
    private ExpenditureRepository expenditureRepository;

    @Autowired
    private PersonRepository personRepository;

    public Expenditure save(Expenditure expenditure) {
        Optional<Person> person = personRepository
                .findById(expenditure.getPerson().getId());
        
        if(!person.isPresent() || person.get().isInactive()) {
            throw new NonExistentOrInativePersonException();
        }

        return expenditureRepository.save(expenditure);
    }

    public Page<Expenditure> searchAll(String minDueDate, String maxDueDate, String description, Pageable pageable) {
        LocalDate minDate = minDueDate.equals("") ? null : LocalDate.parse(minDueDate);        
        LocalDate maxDate = maxDueDate.equals("") ? null : LocalDate.parse(maxDueDate);
        String desc = description.equals("") ? null : description;

        return expenditureRepository.searchAll(minDate, maxDate, desc, pageable);

    }
}
