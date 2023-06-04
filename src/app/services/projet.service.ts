import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Membre} from "../models/membre.model";
import {Projet} from "../models/projet.model";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = `${environment.apiBaseUrl}/projet`;
  constructor(private http: HttpClient) { }

  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/all`);
  }

  addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.baseUrl}/add`,projet);
  }

  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseUrl}/update`,projet);
  }

  deleteProjet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/`+id);
  }

}
