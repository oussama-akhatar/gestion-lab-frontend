import { Etablissement } from "./etablissement.model";

export interface Laboratoire {
  id?: number;
  intitule?: string;
  departement?: string;
  etablissement?: Etablissement;
}
