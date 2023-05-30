import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etablissement } from 'src/app/models/Etablissement';
import { EtablissementService } from 'src/app/services/etablissement.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

  public etablissements?: Etablissement[];

  constructor(private etablissementService:EtablissementService){ }

  ngOnInit(): void {
    this.getEtablissements();
  }

  public getEtablissements(): void {
    this.etablissementService.getEtablissements().subscribe(
      response => this.etablissements = response
    );
  }

}
