import { Laboratoire } from "./laboratoire.model";
import {ExpressionBesoin} from "./expressionBesoin.model";

export interface Membre {
    id?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    email?: string;
    password?:string;
    telephone?: string;
    directeur?: boolean;
    laboratoire?: Laboratoire;
    expressionBesoins?: ExpressionBesoin[];
}
