package com.enterprise.api.financiatrackr;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.enterprise.api.financiatrackr.repositories.ExpenditureRepository;

@SpringBootApplication
public class FinanciatrackrApplication implements CommandLineRunner {

	@Autowired
	private ExpenditureRepository expenditureRepository;

	public static void main(String[] args) {
		SpringApplication.run(FinanciatrackrApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		LocalDate firstDay = LocalDate.of(2023, 1, 1);
		LocalDate lastDay = LocalDate.of(2023, 12, 31);

		System.out.println(expenditureRepository.byCategory(firstDay, lastDay));
	}

}
