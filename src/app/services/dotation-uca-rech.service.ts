import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DotationUcaRech} from "../models/dotationUcaRech.model";

@Injectable({
  providedIn: 'root'
})
export class DotationUcaRechService {
  private baseUrl = `${environment.apiBaseUrl}/dotationUCARech`;
  constructor(private http: HttpClient) { }

  public getAllDotationUcaRechs(): Observable<DotationUcaRech[]> {
    return this.http.get<DotationUcaRech[]>(`${this.baseUrl}/all`);
  }

  public addDotationUcaRech(dotationUcaRech: DotationUcaRech): Observable<DotationUcaRech> {
    return this.http.post<DotationUcaRech>(`${this.baseUrl}/add`, dotationUcaRech);
  }

  public editDotationUcaRech(dotationUcaRech: DotationUcaRech): Observable<DotationUcaRech> {
    return this.http.put<DotationUcaRech>(`${this.baseUrl}/update`, dotationUcaRech);
  }

  public deleteDotationUcaRech(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
