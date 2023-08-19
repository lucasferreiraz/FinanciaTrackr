CREATE TABLE tb_user (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(150) NOT NULL
);

CREATE TABLE tb_role (
	id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	authority VARCHAR(50) NOT NULL
);

CREATE TABLE tb_user_role (
	user_id BIGINT NOT NULL,
	role_id BIGINT NOT NULL,
	PRIMARY KEY (user_id, role_id),
	FOREIGN KEY (user_id) REFERENCES tb_user(id),
	FOREIGN KEY (role_id) REFERENCES tb_role(id)
);

INSERT INTO tb_user (name, email, password) values ('Administrador', 'admin@email.com', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.');
INSERT INTO tb_user (name, email, password) values ('Lucas Ferreira', 'lucas@email.com', '$2a$10$SJlMM.SPwymAZ9lzcLxio.eY2fVHC8HoiTbxS/jvRP9yNrYu8C7Cm');

INSERT INTO tb_role (authority) values ('ROLE_CREATE_CATEGORY');
INSERT INTO tb_role (authority) values ('ROLE_SEARCH_CATEGORY');

INSERT INTO tb_role (authority) values ('ROLE_CREATE_PERSON');
INSERT INTO tb_role (authority) values ('ROLE_REMOVE_PERSON');
INSERT INTO tb_role (authority) values ('ROLE_SEARCH_PERSON');

INSERT INTO tb_role (authority) values ('ROLE_CREATE_EXPENDITURE');
INSERT INTO tb_role (authority) values ('ROLE_REMOVE_EXPENDITURE');
INSERT INTO tb_role (authority) values ('ROLE_SEARCH_EXPENDITURE');

-- admin
INSERT INTO tb_user_role (user_id, role_id) values (1, 1);
INSERT INTO tb_user_role (user_id, role_id) values (1, 2);
INSERT INTO tb_user_role (user_id, role_id) values (1, 3);
INSERT INTO tb_user_role (user_id, role_id) values (1, 4);
INSERT INTO tb_user_role (user_id, role_id) values (1, 5);
INSERT INTO tb_user_role (user_id, role_id) values (1, 6);
INSERT INTO tb_user_role (user_id, role_id) values (1, 7);
INSERT INTO tb_user_role (user_id, role_id) values (1, 8);

-- maria
INSERT INTO tb_user_role (user_id, role_id) values (2, 2);
INSERT INTO tb_user_role (user_id, role_id) values (2, 5);
INSERT INTO tb_user_role (user_id, role_id) values (2, 8);