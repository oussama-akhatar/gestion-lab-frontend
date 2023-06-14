import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExpressionBesoin} from "../models/expressionBesoin.model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  countEtablissement(): Observable<number> {
    return this.http.get<number>("http://localhost:8083/etablissement/countEtablissement");
  }

  countLaboratoire(): Observable<number> {
    return this.http.get<number>("http://localhost:8083/laboratoire/countLaboratoire");
  }

  countMembre(): Observable<number> {
    return this.http.get<number>("http://localhost:8083/countMembre");
  }

  sommeDotationUcaRech(): Observable<number> {
    return this.http.get<number>("http://localhost:8083/sommeDotationUcaRech");
  }

  counLaboratoiretByEtablissement(): Observable<Object> {
    return this.http.get<Object>("http://localhost:8083/laboratoire/etablissement");
  }
}
