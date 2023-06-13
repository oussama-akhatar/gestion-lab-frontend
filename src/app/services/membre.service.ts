import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre.model';
import {Laboratoire} from "../models/laboratoire.model";

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private baseUrl = `${environment.apiBaseUrl}/membre`;

  constructor(private http: HttpClient) { }

  getAllMembres(): Observable<Membre[]> {
    return this.http.get<Membre[]>(`${this.baseUrl}/all`);
  }

  getAllMembresLabo(id: number): Observable<Membre[]> {
    return this.http.get<Membre[]>(`${this.baseUrl}/all/`+id);
  }

  getAllDirecteurs(): Observable<Membre[]> {
    return this.http.get<Membre[]>(`${this.baseUrl}/allDirecteurs`);
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
