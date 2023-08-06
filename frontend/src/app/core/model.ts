export class Login {
  email?: string;
  password?: string;
}

export class Pessoa {
  id?: number;
  name?: string;
  active = true;
  address = new Endereco();
}

export class Endereco {
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  zipcode?: string;
  city?: string;
  state?: string;
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
