import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Membre} from "../models/membre.model";
import {HttpClient} from "@angular/common/http";
import {MembreDotationUcaRech} from "../models/membreDotationUcaRech.model";

@Injectable({
  providedIn: 'root'
})
export class MembreDotationUcaRechService {

  private baseUrl = `${environment.apiBaseUrl}/membreDotationUCARech`;
  constructor(private http: HttpClient) { }

  getAllMembreDotationUcaRechs(): Observable<MembreDotationUcaRech[]> {
    return this.http.get<MembreDotationUcaRech[]>(`${this.baseUrl}/all`);
  }

  addMembreDotationUcaRech(membreDotationUcaRech: MembreDotationUcaRech): Observable<MembreDotationUcaRech> {
    return this.http.post<MembreDotationUcaRech>(`${this.baseUrl}/add`, membreDotationUcaRech);
  }

  getMembreDotationUcaRechById(id: number): Observable<MembreDotationUcaRech> {
    return this.http.get<MembreDotationUcaRech>(`${this.baseUrl}/find/${id}`);
  }

  updateMembreDotationUcaRech(membreDotationUcaRech: MembreDotationUcaRech): Observable<MembreDotationUcaRech> {
    return this.http.put<MembreDotationUcaRech>(`${this.baseUrl}/update`, membreDotationUcaRech);
  }

  deleteMembreDotationUcaRech(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


}
