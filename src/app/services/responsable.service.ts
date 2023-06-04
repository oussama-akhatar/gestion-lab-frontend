import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responsable } from '../models/responsable.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private baseUrl = `${environment.apiBaseUrl}/responsable`;

  constructor(private http: HttpClient) { }

  getAllResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${this.baseUrl}/all`);
  }

  addResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.post<Responsable>(`${this.baseUrl}/add`, responsable);
  }

  getResponsableById(id: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.baseUrl}/find/${id}`);
  }

  updateResponsable(responsable: Responsable): Observable<Responsable> {
    return this.http.put<Responsable>(`${this.baseUrl}/update`, responsable);
  }

  deleteResponsable(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
