import { Laboratoire } from "./Laboratoire";

export interface Etablissement {
  id: number,
  intitule: string,
  adresse: string,
  laboratoires: Laboratoire[]
}
