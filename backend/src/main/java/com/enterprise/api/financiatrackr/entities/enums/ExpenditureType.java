package com.enterprise.api.financiatrackr.entities.enums;

public enum ExpenditureType {
    REVENUE("Receita"),
    EXPENSE("Despesa");

    private String description;

    private ExpenditureType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
    
}
