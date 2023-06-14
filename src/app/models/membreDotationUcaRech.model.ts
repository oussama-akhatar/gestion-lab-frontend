import {Membre} from "./membre.model";
import {DotationUcaRech} from "./dotationUcaRech.model";

export interface MembreDotationUcaRech {
  id?: number,
  dotationMembre?: number,
  membre: Membre,
  dotationUCARech: DotationUcaRech
}
