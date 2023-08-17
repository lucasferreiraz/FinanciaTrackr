export class Login {
  email?: string;
  password?: string;
}

export class Contato {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: string) { }
}

export class Pessoa {
  id?: number;
  name?: string;
  active = true;
  address = new Endereco();
  contacts = new Array<Contato>;
}

export class Estado {
  id?: number;
  name?: string;
}

export class Cidade {
  id?: number;
  name?: string;
  state = new Estado();
}


export class Endereco {
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  zipcode?: string;
  city = new Cidade();
}

export class Categoria {
  id?: number;
}

export class Lancamento {
  id?: number;
  type=  'REVENUE';
  description?: string;
  dueDate?: Date;
  paymentDate?: Date;
  value?: number;
  observation?: string;
  person = new Pessoa();
  category = new Categoria();
}
