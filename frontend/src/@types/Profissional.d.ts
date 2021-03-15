interface Profissional {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  tipoDeProfissional: TipoProfissional;
}

interface TipoProfissional {
  id: string;
  descricao: string;
}
interface ProfissionalData {
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
}
