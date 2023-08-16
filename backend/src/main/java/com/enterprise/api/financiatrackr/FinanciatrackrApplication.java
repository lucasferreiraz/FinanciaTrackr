package com.enterprise.api.financiatrackr;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.enterprise.api.financiatrackr.config.property.ApplicationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties.class)
public class FinanciatrackrApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(FinanciatrackrApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}

}
