import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etablissement } from '../models/Etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private apiServerUrl = "http://localhost:8083";

  constructor(private http: HttpClient) { }

  public getEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.apiServerUrl}/etablissement/all`);
  }

  public addEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(`${this.apiServerUrl}/etablissement/add`, etablissement);
  }

}
