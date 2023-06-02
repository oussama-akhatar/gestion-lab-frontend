import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Laboratoire } from 'src/app/models/laboratoire.model';
import { Membre } from 'src/app/models/membre.model';
import { LaboratoireService } from 'src/app/services/laboratoire.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  newMembreForm: FormGroup;
  laboratoires: Laboratoire[];

  constructor(
    private formBuilder: FormBuilder,
    private membreService: MembreService,
    private laboratoireService: LaboratoireService
  ) { }

  ngOnInit(): void {
    this.initMembreForm();
    this.loadLaboratoires();
  }

  initMembreForm(): void {
    this.newMembreForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      isDirecteur: [false],
      laboratoire: ['', Validators.required]
    });
  }

  loadLaboratoires(): void {
    this.laboratoireService.getAllLaboratoires().subscribe(
      (laboratoires: Laboratoire[]) => {
        this.laboratoires = laboratoires;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addMembre(): void {
    if (this.newMembreForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const membreData: Membre = {
      nom: this.newMembreForm.value.nom,
      prenom: this.newMembreForm.value.prenom,
      dateNaissance: this.newMembreForm.value.dateNaissance,
      email: this.newMembreForm.value.email,
      telephone: this.newMembreForm.value.telephone,
      isDirecteur: this.newMembreForm.value.isDirecteur,
      laboratoire: {
        id: this.newMembreForm.value.laboratoire.id
      }
    };

    this.membreService.addMembre(membreData).subscribe(
      (membre: Membre) => {
        console.log('Membre added successfully:', membre);
        // Reset the form
        this.newMembreForm.reset();
      },
      (error) => {
        console.log('Error adding membre:', error);
      }
    );

  }

}
