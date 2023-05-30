import { Etablissement } from "./Etablissement";

export interface Laboratoire {
  id: number,
  intitule: string,
  departement: string,
  etablissement: Etablissement
}
