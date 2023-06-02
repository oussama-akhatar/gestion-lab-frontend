import { Component, OnInit } from '@angular/core';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Etablissement } from 'src/app/models/etablissement.model';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

  public etablissements: Etablissement[] = [];
  public newEtablissementForm: FormGroup;
  public editEtablissementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private etablissementService: EtablissementService
  ) { }

  ngOnInit(): void {
    this.getEtablissements();

    this.newEtablissementForm = this.fb.group({
      intitule: this.fb.control('', [Validators.required]),
      adresse: this.fb.control('', [Validators.required])
    });

    this.editEtablissementForm = this.fb.group({
      id: this.fb.control(null, [Validators.required]),
      intitule: this.fb.control(null, [Validators.required]),
      adresse: this.fb.control(null, [Validators.required])
    });
  }

  getEtablissements(): void {
    this.etablissementService.getAllEtablissements().subscribe(
      data => this.etablissements = data
    );
  }

  saveEtablissement() {
    let etablissement: Etablissement = this.newEtablissementForm.value;
    this.etablissementService.addEtablissement(etablissement).subscribe({
      next: value => {
        console.log(value);
        this.getEtablissements()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadObjectData(etablissement: Etablissement) {
    this.editEtablissementForm.patchValue({
      id: etablissement.id,
      intitule: etablissement.intitule,
      adresse: etablissement.adresse
    });
  }

  editEtablissement() {
    const etablissement: Etablissement = {
      id: this.editEtablissementForm.value.id,
      intitule: this.editEtablissementForm.value.intitule,
      adresse: this.editEtablissementForm.value.adresse
    }

    this.etablissementService.editEtablissement(etablissement).subscribe(
      (updatedEtablissement: Etablissement) => {
        console.log(updatedEtablissement);
        this.getEtablissements()
      });
  }

  deleteEtablissement(etablissement: Etablissement): void {
    if (confirm("Etes vous sure ??"))
      this.etablissementService.deleteEtablissement(etablissement).subscribe({
        next: value => {
          this.etablissements = this.etablissements.filter(e => e.id != etablissement.id);
        }
      });
  }

}
