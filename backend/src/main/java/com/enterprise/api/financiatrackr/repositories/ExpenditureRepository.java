package com.enterprise.api.financiatrackr.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.enterprise.api.financiatrackr.entities.Expenditure;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditureCategoryStatistics;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditurePerDayStatistics;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditurePersonStatistics;
import com.enterprise.api.financiatrackr.repositories.projections.ExpenditureResume;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long> {

    @Query("SELECT obj FROM Expenditure obj " +
            "JOIN FETCH obj.category " +
            "JOIN FETCH obj.person " +
            "WHERE " +
            "(COALESCE(:minDate) IS NULL OR obj.dueDate >= :minDate) AND " +
            "(COALESCE(:maxDate) IS NULL OR obj.dueDate <= :maxDate) AND " +
            "(COALESCE(:description) IS NULL OR LOWER(obj.description) LIKE LOWER(CONCAT('%', :description, '%')))")
    public Page<Expenditure> searchAll(LocalDate minDate, LocalDate maxDate, String description, Pageable pageable);

    @Query("SELECT NEW com.enterprise.api.financiatrackr.repositories.projections.ExpenditureResume(e.id, e.description, e.dueDate, e.paymentDate, e.value, e.type, c.name, p.name) "
            + "FROM Expenditure e "
            + "INNER JOIN e.category c "
            + "INNER JOIN e.person p "
            + "WHERE "
            + "(COALESCE(:minDate) IS NULL OR e.dueDate >= :minDate) AND "
            + "(COALESCE(:maxDate) IS NULL OR e.dueDate <= :maxDate) AND "
            + "(COALESCE(:description) IS NULL OR LOWER(e.description) LIKE LOWER(CONCAT('%', :description, '%'))) "
            + "ORDER BY e.id")
    public Page<ExpenditureResume> resume(LocalDate minDate, LocalDate maxDate, String description, Pageable pageable);

    @Query("SELECT NEW com.enterprise.api.financiatrackr.repositories.projections.ExpenditureCategoryStatistics(c, SUM(e.value)) "
            + "FROM Expenditure e "
            + "INNER JOIN e.category c "
            + "WHERE "
            + "(e.dueDate >= :firstDay) AND (e.dueDate <= :lastDay) "
            + "GROUP BY c ")
    public List<ExpenditureCategoryStatistics> byCategory(LocalDate firstDay, LocalDate lastDay);

    @Query("SELECT NEW com.enterprise.api.financiatrackr.repositories.projections.ExpenditurePerDayStatistics(e.type, e.dueDate, SUM(e.value)) "
            + "FROM Expenditure e "
            + "WHERE "
            + "(e.dueDate >= :firstDay) AND (e.dueDate <= :lastDay) "
            + "GROUP BY e.type, e.dueDate "
            + "ORDER BY e.dueDate")
    public List<ExpenditurePerDayStatistics> byDay(LocalDate firstDay, LocalDate lastDay);

    @Query("SELECT NEW com.enterprise.api.financiatrackr.repositories.projections.ExpenditurePersonStatistics(e.type, p.name, SUM(e.value)) "
            + "FROM Expenditure e "
            + "INNER JOIN e.person p "
            + "WHERE "
            + "(e.dueDate >= :firstDay) AND (e.dueDate <= :lastDay) "
            + "GROUP BY e.type, p.name "
            + "ORDER BY p.name")
    public List<ExpenditurePersonStatistics> byPerson(LocalDate firstDay, LocalDate lastDay);
}