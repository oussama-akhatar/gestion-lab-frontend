import { Membre } from "./membre.model";
import { Responsable } from "./responsable.model";
import { TypeBesoin } from "./typeBesoin.model";

export interface ExpressionBesoin {
    id?: number;
    description: string;
    validerDirecteur: boolean;
    membre: Membre;
    responsable: Responsable;
    typeBesoin: TypeBesoin;
}
