import {Projet} from "./projet.model";
import {Membre} from "./membre.model";

export interface ProjetMembre {
  id?:number,
  dotateurProjet:string,
  responsableProjet: boolean,
  projet: Projet,
  membre: Membre
}
