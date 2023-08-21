CREATE TABLE tb_contact (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    person_id BIGINT NOT NULL,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	phone VARCHAR(20) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES tb_person(id)
);

INSERT INTO tb_contact (person_id, name, email, phone) VALUES (1, 'Marcos Henrique', 'marcos@email.com', '00 0000-0000');