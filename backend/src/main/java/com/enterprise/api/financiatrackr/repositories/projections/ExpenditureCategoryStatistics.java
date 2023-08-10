package com.enterprise.api.financiatrackr.repositories.projections;

import java.math.BigDecimal;

import com.enterprise.api.financiatrackr.entities.Category;

public class ExpenditureCategoryStatistics {
    private Category category;
	
	private BigDecimal amount;

	public ExpenditureCategoryStatistics(Category category, BigDecimal amount) {
		this.category = category;
		this.amount = amount;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
