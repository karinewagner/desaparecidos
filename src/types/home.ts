export interface IMissingPersonListResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: IContent[];
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface IContent {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao?: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz?: ListaCartaz[];
  ocoId: number;
}

export interface OcorrenciaEntrevDesapDTO {
  informacao?: string;
  vestimentasDesaparecido: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface IMissingPersonList {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO" | "";
  status?: "DESAPARECIDO" | "LOCALIZADO";
  pagina: number;
  porPagina: number;
}

export interface ListaCartaz {
  urlCartaz: string;
  tipoCartaz: string;
}
