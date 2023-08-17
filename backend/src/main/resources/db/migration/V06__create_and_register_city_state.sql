CREATE TABLE tb_state (
	id BIGINT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO tb_state (id, name) VALUES(1, 'Acre');
INSERT INTO tb_state (id, name) VALUES(2, 'Alagoas');
INSERT INTO tb_state (id, name) VALUES(3, 'Amazonas');
INSERT INTO tb_state (id, name) VALUES(4, 'Amapá');
INSERT INTO tb_state (id, name) VALUES(5, 'Bahia');
INSERT INTO tb_state (id, name) VALUES(6, 'Ceará');
INSERT INTO tb_state (id, name) VALUES(7, 'Distrito Federal');
INSERT INTO tb_state (id, name) VALUES(8, 'Espírito Santo');
INSERT INTO tb_state (id, name) VALUES(9, 'Goiás');
INSERT INTO tb_state (id, name) VALUES(10, 'Maranhão');
INSERT INTO tb_state (id, name) VALUES(11, 'Minas Gerais');
INSERT INTO tb_state (id, name) VALUES(12, 'Mato Grosso do Sul');
INSERT INTO tb_state (id, name) VALUES(13, 'Mato Grosso');
INSERT INTO tb_state (id, name) VALUES(14, 'Pará');
INSERT INTO tb_state (id, name) VALUES(15, 'Paraíba');
INSERT INTO tb_state (id, name) VALUES(16, 'Pernambuco');
INSERT INTO tb_state (id, name) VALUES(17, 'Piauí');
INSERT INTO tb_state (id, name) VALUES(18, 'Paraná');
INSERT INTO tb_state (id, name) VALUES(19, 'Rio de Janeiro');
INSERT INTO tb_state (id, name) VALUES(20, 'Rio Grande do Norte');
INSERT INTO tb_state (id, name) VALUES(21, 'Rondônia');
INSERT INTO tb_state (id, name) VALUES(22, 'Roraima');
INSERT INTO tb_state (id, name) VALUES(23, 'Rio Grande do Sul');
INSERT INTO tb_state (id, name) VALUES(24, 'Santa Catarina');
INSERT INTO tb_state (id, name) VALUES(25, 'Sergipe');
INSERT INTO tb_state (id, name) VALUES(26, 'São Paulo');
INSERT INTO tb_state (id, name) VALUES(27, 'Tocantins');


CREATE TABLE tb_city (
	id BIGINT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    state_id BIGINT NOT NULL,
    FOREIGN KEY (state_id) REFERENCES tb_state(id)
);

INSERT INTO tb_city (id, name, state_id) VALUES (1, 'Belo Horizonte', 11);
INSERT INTO tb_city (id, name, state_id) VALUES (2, 'Uberlândia', 11);
INSERT INTO tb_city (id, name, state_id) VALUES (3, 'Uberaba', 11);
INSERT INTO tb_city (id, name, state_id) VALUES (4, 'São Paulo', 26);
INSERT INTO tb_city (id, name, state_id) VALUES (5, 'Campinas', 26);
INSERT INTO tb_city (id, name, state_id) VALUES (6, 'Rio de Janeiro', 19);
INSERT INTO tb_city (id, name, state_id) VALUES (7, 'Angra dos Reis', 19);
INSERT INTO tb_city (id, name, state_id) VALUES (8, 'Goiânia', 9);
INSERT INTO tb_city (id, name, state_id) VALUES (9, 'Caldas Novas', 9);


ALTER TABLE tb_person DROP COLUMN city;
ALTER TABLE tb_person DROP COLUMN state;
ALTER TABLE tb_person ADD COLUMN city_id BIGINT;
ALTER TABLE tb_person ADD CONSTRAINT fk_person_city FOREIGN KEY (city_id) REFERENCES tb_city(id);

UPDATE tb_person SET city_id = 2;