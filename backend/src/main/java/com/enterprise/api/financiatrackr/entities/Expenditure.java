package com.enterprise.api.financiatrackr.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.enterprise.api.financiatrackr.entities.enums.ExpenditureType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_expenditure")
public class Expenditure {
    
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @NotNull
	private String description;

    @NotNull
	@Column(name = "due_date")
	private LocalDate dueDate;

	@Column(name = "payment_date")
	private LocalDate paymentDate;

    @NotNull
	private BigDecimal value;

	private String observation;

    @NotNull
	@Enumerated(EnumType.STRING)
	private ExpenditureType type;

    @NotNull
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

    @JsonIgnoreProperties("contacts")
    @NotNull
	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;

    public Expenditure() {
    }

    public Expenditure(Long id, String description, LocalDate dueDate, LocalDate paymentDate, BigDecimal value,
            String observation, ExpenditureType type, Category category, Person person) {
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.paymentDate = paymentDate;
        this.value = value;
        this.observation = observation;
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

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public ExpenditureType getType() {
        return type;
    }

    public void setType(ExpenditureType type) {
        this.type = type;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Expenditure other = (Expenditure) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    
}
