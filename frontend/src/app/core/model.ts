export class Pessoa {
  id?: number;
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
