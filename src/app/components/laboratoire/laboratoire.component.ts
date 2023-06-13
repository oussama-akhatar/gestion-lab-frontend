import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etablissement } from 'src/app/models/etablissement.model';

import { Laboratoire } from 'src/app/models/laboratoire.model';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { LaboratoireService } from 'src/app/services/laboratoire.service';

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.component.html',
  styleUrls: ['./laboratoire.component.css']
})
export class LaboratoireComponent implements OnInit {

  laboratoires: Laboratoire[] = [];
  etablissements: Etablissement[] = [];
  newLaboratoireForm: FormGroup;
  editLaboratoireForm: FormGroup;

  constructor(
    private laboratoireService: LaboratoireService,
    private etablissementService: EtablissementService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllLaboratoires();
    this.loadEtablissements();
  }



  initForm(): void {
    this.newLaboratoireForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      departement: ['', Validators.required],
      etablissement: ['', Validators.required]
    });

    this.editLaboratoireForm = this.formBuilder.group({
      id: ['', Validators.required],
      intitule: ['', Validators.required],
      departement: ['', Validators.required],
      etablissement: ['', Validators.required]
    })
  }

  getAllLaboratoires(): void {
    this.laboratoireService.getAllLaboratoires().subscribe(
      (laboratoires: Laboratoire[]) => {
        this.laboratoires = laboratoires;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadEtablissements(): void {
    this.etablissementService.getAllEtablissements().subscribe(
      (etablissements: Etablissement[]) => {
        this.etablissements = etablissements;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addLaboratoire(): void {
    if (this.newLaboratoireForm.valid) {
      const laboratoire: Laboratoire = {
        intitule: this.newLaboratoireForm.value.intitule,
        departement: this.newLaboratoireForm.value.departement,
        etablissement: {
          id: this.newLaboratoireForm.value.etablissement.id
        }
      };

      this.laboratoireService.addLaboratoire(laboratoire).subscribe(
        (newLaboratoire: Laboratoire) => {
          console.log('New Laboratoire:', newLaboratoire);
          // Reset the form
          this.newLaboratoireForm.reset();
          this.getAllLaboratoires();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  public loadObjectData(laboratoire: Laboratoire) {
    this.editLaboratoireForm.patchValue({
      id: laboratoire.id,
      intitule: laboratoire.intitule,
      departement: laboratoire.departement,
      etablissement: laboratoire.etablissement
    });
  }

  updateLaboratoire(): void {
    const laboratoire: Laboratoire = {
      id: this.editLaboratoireForm.value.id,
      intitule: this.editLaboratoireForm.value.intitule,
      departement: this.editLaboratoireForm.value.departement,
      etablissement: {
        id: this.editLaboratoireForm.value.etablissement.id,
        intitule: '',
        adresse: ''
      }
    }
    this.laboratoireService.updateLaboratoire(laboratoire).subscribe(
      (updatedLaboratoire: Laboratoire) => {
        // Handle success, if needed
        this.getAllLaboratoires()
        console.log(updatedLaboratoire)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteLaboratoire(id: number): void {
    if (confirm("Etes vous sure !!"))
      this.laboratoireService.deleteLaboratoire(id).subscribe(
        (r) => {
          // Handle success, if needed
          console.log(r)
          this.getAllLaboratoires()
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

}
