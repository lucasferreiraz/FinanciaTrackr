package com.enterprise.api.financiatrackr.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enterprise.api.financiatrackr.entities.Expenditure;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long> {

    @Query("SELECT obj FROM Expenditure obj " +
            "JOIN FETCH obj.category " +
            "JOIN FETCH obj.person " +
            "WHERE " +
            "(COALESCE(:minDate) IS NULL OR obj.dueDate >= :minDate) AND " +
            "(COALESCE(:maxDate) IS NULL OR obj.dueDate <= :maxDate) AND " +
            "(COALESCE(:description) IS NULL OR LOWER(obj.description) LIKE LOWER(CONCAT('%', :description, '%')))")
    public Page<Expenditure> searchAll(LocalDate minDate, LocalDate maxDate, String description, Pageable pageable);

}