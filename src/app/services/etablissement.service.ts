import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Etablissement } from '../models/etablissement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private baseUrl = `${environment.apiBaseUrl}/etablissement`;
  constructor(private http: HttpClient) { }

  public getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.baseUrl}/all`);
  }

  public addEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(`${this.baseUrl}/add`, etablissement);
  }

  public editEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.baseUrl}/update`, etablissement);
  }

  public deleteEtablissement(etablissement: Etablissement) {
    return this.http.delete<void>(`${this.baseUrl}/delete/${etablissement.id}`);
  }

}
