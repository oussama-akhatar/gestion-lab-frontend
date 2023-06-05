import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projet} from "../models/projet.model";
import {ProjetMembre} from "../models/projetMembre.model";

@Injectable({
  providedIn: 'root'
})
export class ProjetMembreService {
  private baseUrl = `${environment.apiBaseUrl}/projetMembre`;
  constructor(private http: HttpClient) { }

  getAllProjetsMembres(): Observable<ProjetMembre[]> {
    return this.http.get<ProjetMembre[]>(`${this.baseUrl}/all`);
  }

  addProjetMembre(projetMembre: ProjetMembre): Observable<ProjetMembre> {
    return this.http.post<ProjetMembre>(`${this.baseUrl}/add`,projetMembre);
  }

  updateProjetMembre(projetMembre: ProjetMembre): Observable<ProjetMembre> {
    return this.http.put<ProjetMembre>(`${this.baseUrl}/update`,projetMembre);
  }

  deleteProjetMembre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/`+id);
  }
}
