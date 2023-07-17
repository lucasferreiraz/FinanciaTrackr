CREATE TABLE tb_category (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO tb_category (name) VALUES ('Lazer');
INSERT INTO tb_category (name) VALUES ('Alimentação');
INSERT INTO tb_category (name) VALUES ('Supermercado');
INSERT INTO tb_category (name) VALUES ('Farmácia');
INSERT INTO tb_category (name) VALUES ('Outros')