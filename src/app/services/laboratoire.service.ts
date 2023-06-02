import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laboratoire } from '../models/laboratoire.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {

  // laboratoire!: Laboratoire;

  private baseUrl = `${environment.apiBaseUrl}/laboratoire`;

  constructor(private http: HttpClient) { }

  getAllLaboratoires(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(`${this.baseUrl}/all`);
  }

  addLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(`${this.baseUrl}/add`, laboratoire);
  }

  getLaboratoireById(id: number): Observable<Laboratoire> {
    return this.http.get<Laboratoire>(`${this.baseUrl}/find/${id}`);
  }

  updateLaboratoire(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.put<Laboratoire>(`${this.baseUrl}/update`, laboratoire);
  }

  deleteLaboratoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

}
