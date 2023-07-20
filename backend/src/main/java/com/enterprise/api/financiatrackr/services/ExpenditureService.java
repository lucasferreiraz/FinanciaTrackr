package com.enterprise.api.financiatrackr.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
}
