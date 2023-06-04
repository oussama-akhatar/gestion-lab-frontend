import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Membre} from "../models/membre.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MembreDotationUcaRechService {

  private baseUrl = `${environment.apiBaseUrl}/membreDotationUCARech`;
  constructor(private http: HttpClient) { }

  getAllMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(`${this.baseUrl}/all`);
  }

  addMembre(membre: Membre): Observable<Membre> {
    return this.http.post<Membre>(`${this.baseUrl}/add`, membre);
  }

  getMembreById(id: number): Observable<Membre> {
    return this.http.get<Membre>(`${this.baseUrl}/find/${id}`);
  }

  updateMembre(membre: Membre): Observable<Membre> {
    return this.http.put<Membre>(`${this.baseUrl}/update`, membre);
  }

  deleteMembre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


}
