CREATE TABLE tb_expenditure (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	description VARCHAR(50) NOT NULL,
	due_date DATE NOT NULL,
	payment_date DATE,
	value DECIMAL(10,2) NOT NULL,
	observation VARCHAR(100),
	type VARCHAR(20) NOT NULL,
	category_id BIGINT NOT NULL,
	person_id BIGINT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES tb_category(id),
	FOREIGN KEY (person_id) REFERENCES tb_person(id)
);

INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Salário mensal', '2023-06-10', null, 6500.00, 'Distribuição de lucros', 'REVENUE', 1, 1);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Bahamas', '2023-02-10', '2023-02-10', 100.32, null, 'EXPENSE', 2, 2);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Top Club', '2023-06-10', null, 120, null, 'REVENUE', 3, 3);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('CEMIG', '2023-02-10', '2023-02-10', 110.44, 'Geração', 'REVENUE', 3, 4);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('DMAE', '2023-06-10', null, 200.30, null, 'EXPENSE', 3, 5);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Extra', '2023-03-10', '2023-03-10', 1010.32, null, 'REVENUE', 4, 6);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Bahamas', '2023-06-10', null, 500, null, 'REVENUE', 1, 7);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Top Club', '2023-03-10', '2023-03-10', 400.32, null, 'EXPENSE', 4, 8);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Despachante', '2023-06-10', null, 123.64, 'Multas', 'EXPENSE', 3, 9);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Pneus', '2023-04-10', '2023-04-10', 665.33, null, 'REVENUE', 5, 4);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Café', '2023-06-10', null, 8.32, null, 'EXPENSE', 1, 5);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Eletrônicos', '2023-04-10', '2023-04-10', 2100.32, null, 'EXPENSE', 5, 4);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Instrumentos', '2023-06-10', null, 1040.32, null, 'EXPENSE', 4, 3);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Café', '2023-04-10', '2023-04-10', 4.32, null, 'EXPENSE', 4, 2);
INSERT INTO tb_expenditure (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Lanche', '2023-06-10', null, 10.20, null, 'EXPENSE', 4, 1);