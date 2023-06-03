import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeBesoin} from "../models/typeBesoin.model";

@Injectable({
  providedIn: 'root'
})
export class TypeBesoinService {

  private baseUrl = `${environment.apiBaseUrl}/typeBesoin`;
  constructor(private http: HttpClient) { }

  public getAllTypeBesoins(): Observable<TypeBesoin[]> {
    return this.http.get<TypeBesoin[]>(`${this.baseUrl}/all`);
  }

  public addTypeBesoin(typeBesoin: TypeBesoin): Observable<TypeBesoin> {
    return this.http.post<TypeBesoin>(`${this.baseUrl}/add`, typeBesoin);
  }

  public editTypeBesoin(typeBesoin: TypeBesoin): Observable<TypeBesoin> {
    return this.http.put<TypeBesoin>(`${this.baseUrl}/update`, typeBesoin);
  }

  public deleteTypeBesoin(typeBesoin: TypeBesoin) {
    return this.http.delete<void>(`${this.baseUrl}/delete/${typeBesoin.id}`);
  }
}
