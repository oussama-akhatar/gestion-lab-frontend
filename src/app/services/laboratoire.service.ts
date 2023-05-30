import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laboratoire } from '../models/Laboratoire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {

  // laboratoire!: Laboratoire;

  private baseUrl = "http://localhost:8083/laboratoire";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Laboratoire[]> {
    return this.http.get<Laboratoire[]>(`${this.baseUrl}/all`);
  }

  create(laboratoire: Laboratoire): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(`${this.baseUrl}/add`, laboratoire);
  }
}
