import { Laboratoire } from "./laboratoire.model";

export interface Membre {
    id?: number;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    email: string;
    telephone: string;
    directeur: boolean;
    laboratoire: Laboratoire;
}
