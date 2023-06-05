import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpressionBesoin } from '../models/expressionBesoin.model';

@Injectable({
  providedIn: 'root'
})
export class ExpressionBesoinService {

  private baseUrl = `${environment.apiBaseUrl}/expressionBesoin`;

  constructor(private http: HttpClient) { }

  getAllExpressionBesoins(): Observable<ExpressionBesoin[]> {
    return this.http.get<ExpressionBesoin[]>(`${this.baseUrl}/all`);
  }

  addExpressionBesoin(expressionBesoin: ExpressionBesoin): Observable<ExpressionBesoin> {
    return this.http.post<ExpressionBesoin>(`${this.baseUrl}/add`, expressionBesoin);
  }

  getExpressionBesoinById(id: number): Observable<ExpressionBesoin> {
    return this.http.get<ExpressionBesoin>(`${this.baseUrl}/find/${id}`);
  }

  updateExpressionBesoin(expressionBesoin: ExpressionBesoin): Observable<ExpressionBesoin> {
    return this.http.put<ExpressionBesoin>(`${this.baseUrl}/update`, expressionBesoin);
  }

  deleteExpressionBesoin(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
