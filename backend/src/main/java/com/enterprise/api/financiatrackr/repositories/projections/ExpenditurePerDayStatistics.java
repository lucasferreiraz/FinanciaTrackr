package com.enterprise.api.financiatrackr.repositories.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.enterprise.api.financiatrackr.entities.enums.ExpenditureType;

public class ExpenditurePerDayStatistics {
    private ExpenditureType expenditureType;
	
	private LocalDate day;
	
	private BigDecimal amount;

	public ExpenditurePerDayStatistics(ExpenditureType expenditureType, LocalDate day, BigDecimal amount){
		this.expenditureType = expenditureType;
		this.day = day;
		this.amount = amount;
	}

	public ExpenditureType getExpenditureType() {
		return expenditureType;
	}

	public void setExpenditureType(ExpenditureType expenditureType) {
		this.expenditureType = expenditureType;
	}

	public LocalDate getDay() {
		return day;
	}

	public void setDay(LocalDate day) {
		this.day = day;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

}