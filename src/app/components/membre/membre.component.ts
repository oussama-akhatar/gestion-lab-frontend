import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Laboratoire} from 'src/app/models/laboratoire.model';
import {Membre} from 'src/app/models/membre.model';
import {LaboratoireService} from 'src/app/services/laboratoire.service';
import {MembreService} from 'src/app/services/membre.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  laboratoires: Laboratoire[] = [];
  membres: Membre[] = [];
  newMembreForm: FormGroup;
  editMembreForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private membreService: MembreService,
    private laboratoireService: LaboratoireService
  ) {
  }

  ngOnInit(): void {
    this.initMembreForm();
    this.loadLaboratoires();
    this.getAllMembres();
  }

  initMembreForm(): void {
    this.newMembreForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      dateNaissance: [new Date(), Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telephone: [null, Validators.required],
      directeur: [false, Validators.required],
      laboratoire: [null, Validators.required]
    });
    this.editMembreForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: [null, Validators.required],
      dateNaissance: [new Date(), Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telephone: [null, Validators.required],
      directeur: [false, Validators.required],
      laboratoire: [null, Validators.required]
    });
  }

  getAllMembres() {
    this.membreService.getAllMembres().subscribe(
      (Membres: Membre[]) => {
        this.membres = Membres;
      },
      (error: any) => {
        console.error(error);
      }
    );
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
      nom: this.newMembreForm.value.nom.toUpperCase(),
      prenom: this.newMembreForm.value.prenom,
      dateNaissance: this.newMembreForm.value.dateNaissance,
      email: this.newMembreForm.value.email,
      telephone: this.newMembreForm.value.telephone,
      directeur: this.newMembreForm.value.directeur,
      laboratoire: {
        id: this.newMembreForm.value.laboratoire.id
      }
    };

    this.membreService.addMembre(membreData).subscribe({
      next: data => {
        console.log('Membre added successfully:', membreData);
        // Reset the form
        this.newMembreForm.reset();
        this.getAllMembres();
      },
      error: err => {
        console.log('Error adding membre:', err);
      }
    });
  }

  loadMembreFormData(membre: Membre) {
    this.editMembreForm.patchValue({
      id: membre.id,
      nom: membre.nom,
      prenom: membre.prenom,
      dateNaissance: membre.dateNaissance,
      email: membre.email,
      telephone: membre.telephone,
      directeur: membre.directeur,
      laboratoire: membre.laboratoire
    });
  }

  updateMembre(): void {
    const updatedMembre: Membre = {
      id: this.editMembreForm.value.id,
      nom: this.editMembreForm.value.nom,
      prenom: this.editMembreForm.value.prenom,
      dateNaissance: this.editMembreForm.value.dateNaissance,
      email: this.editMembreForm.value.email,
      telephone: this.editMembreForm.value.telephone,
      directeur: this.editMembreForm.value.directeur,
      laboratoire: {
        id: this.editMembreForm.value.laboratoire.id
      }
    }
    this.membreService.updateMembre(updatedMembre).subscribe(
      (updatedMembre: Membre) => {
        // Handle success, if needed
        this.getAllMembres()
        console.log(updatedMembre)
      }
    );
  }

  deleteMembre(id: number) {
    if (confirm("Etes vous sure !!"))
      this.membreService.deleteMembre(id).subscribe(
        (r) => {
          // Handle success, if needed
          console.log(r)
          this.getAllMembres()
        }
      );
  }
}
