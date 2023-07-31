package com.enterprise.api.financiatrackr.repositories.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.enterprise.api.financiatrackr.entities.enums.ExpenditureType;

public class ExpenditureResume {
    
    private Long id;
    private String description;
    private LocalDate dueDate;
    private LocalDate paymentDate;
    private BigDecimal value;
    private ExpenditureType type;
    private String category;
    private String person;
    
    public ExpenditureResume() {
    }

    public ExpenditureResume(Long id, String description, LocalDate dueDate, LocalDate paymentDate, BigDecimal value,
            ExpenditureType type) {
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.paymentDate = paymentDate;
        this.value = value;
        this.type = type;
    }

    public ExpenditureResume(Long id, String description, LocalDate dueDate, LocalDate paymentDate, BigDecimal value,
            ExpenditureType type, String category, String person) {
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.paymentDate = paymentDate;
        this.value = value;
        this.type = type;
        this.category = category;
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public ExpenditureType getType() {
        return type;
    }

    public void setType(ExpenditureType type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    
}
