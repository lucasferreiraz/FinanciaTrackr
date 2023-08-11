package com.enterprise.api.financiatrackr.repositories.projections;

import java.math.BigDecimal;

import com.enterprise.api.financiatrackr.entities.enums.ExpenditureType;

public class ExpenditurePersonStatistics {

    private ExpenditureType expenditureType;
	private String personName;
	private BigDecimal amount;
    
    public ExpenditurePersonStatistics(ExpenditureType expenditureType, String personName, BigDecimal amount) {
        this.expenditureType = expenditureType;
        this.personName = personName;
        this.amount = amount;
    }

    public ExpenditureType getExpenditureType() {
        return expenditureType;
    }

    public void setExpenditureType(ExpenditureType expenditureType) {
        this.expenditureType = expenditureType;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
