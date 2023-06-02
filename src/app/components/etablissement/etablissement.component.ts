import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etablissement } from 'src/app/models/Etablissement';
import { EtablissementService } from 'src/app/services/etablissement.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

  public etablissements : Array<Etablissement> = [];
  public etablissementEditForm !: FormGroup;

  constructor(private fb : FormBuilder, private etablissementService:EtablissementService){ }

  ngOnInit(): void {
    this.getEtablissements();
    this.etablissementEditForm = this.fb.group({
      id : this.fb.control(null,[Validators.required]),
      intitule : this.fb.control(null,[Validators.required]),
      adresse : this.fb.control(null, [Validators.required])
    })
  }

  public getEtablissements(): void {
    this.etablissementService.getAllEtablissements().subscribe(
      response => this.etablissements = response
    );
  }

  public deleteEtablissement(etablissement:Etablissement): void {
    if (confirm("Etes vous sure ??"))
    this.etablissementService.deleteEtablissement(etablissement).subscribe({
      next: value => {
        this.etablissements = this.etablissements.filter(e=>e.id!=etablissement.id);
      }
    })
  }

  public editEtablissement() {
    const etablissement: Etablissement = {
      id: this.etablissementEditForm.value.id,
      intitule: this.etablissementEditForm.value.intitule,
      adresse: this.etablissementEditForm.value.adresse,
      // laboratoires: []
    }
    this.etablissementService.editEtablissement(etablissement).subscribe(
      (etablissement1: Etablissement) => {
        console.log(etablissement1);
        this.getEtablissements()
      }
    );
  }

  public loadObjectData(etablissement: Etablissement) {
    this.etablissementEditForm.patchValue({
      id: etablissement.id,
      intitule : etablissement.intitule,
      adresse: etablissement.adresse
    });
  }

}
