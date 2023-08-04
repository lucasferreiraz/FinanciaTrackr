package com.enterprise.api.financiatrackr.services;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.enterprise.api.financiatrackr.entities.Expenditure;
import com.enterprise.api.financiatrackr.entities.Person;
import com.enterprise.api.financiatrackr.repositories.ExpenditureRepository;
import com.enterprise.api.financiatrackr.repositories.PersonRepository;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditureResume;
import com.enterprise.api.financiatrackr.services.exceptions.NonExistentOrInativePersonException;

import jakarta.validation.Valid;

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

    public Expenditure update(Long id, @Valid Expenditure expenditure) {
		Expenditure savedExpenditure = findExistentExpenditure(id);
		
		if (!expenditure.getPerson().equals(savedExpenditure.getPerson()))
			validatePerson(expenditure);
		
		BeanUtils.copyProperties(expenditure, savedExpenditure, "id");
		return expenditureRepository.save(savedExpenditure);
	}

    public Page<Expenditure> searchAll(String minDueDate, String maxDueDate, String description, Pageable pageable) {
        LocalDate minDate = minDueDate.equals("") ? null : LocalDate.parse(minDueDate);        
        LocalDate maxDate = maxDueDate.equals("") ? null : LocalDate.parse(maxDueDate);
        String desc = description.equals("") ? null : description;

        return expenditureRepository.searchAll(minDate, maxDate, desc, pageable);
    }

    public Page<ExpenditureResume> searchAllResumed(String minDueDate, String maxDueDate, String description, Pageable pageable) {
        LocalDate minDate = minDueDate.equals("") ? null : LocalDate.parse(minDueDate);        
        LocalDate maxDate = maxDueDate.equals("") ? null : LocalDate.parse(maxDueDate);
        String desc = description.equals("") ? null : description;

        return expenditureRepository.resume(minDate, maxDate, desc, pageable);

    }

    private Expenditure findExistentExpenditure(Long id) {
            return expenditureRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException());
    }

    private void validatePerson(Expenditure expenditure) {
		Optional<Person> person = null;

		if (expenditure.getPerson().getId() != null)
			person = personRepository.findById(expenditure.getPerson().getId());
		
		if (person.isEmpty() || person.get().isInactive())
			throw new NonExistentOrInativePersonException();
	}
}
