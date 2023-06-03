import {Component, OnInit} from '@angular/core';
import {Projet} from "../../models/projet.model";
import {ProjetService} from "../../services/projet.service";
import {Membre} from "../../models/membre.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit{

  newProjetForm: FormGroup;
  editProjetForm: FormGroup;
  projets: Projet[];

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    this.initProjetForm();
    this.getAllProjets();
  }

  initProjetForm() {
    this.newProjetForm = this.formBuilder.group({
      intitule: [null, Validators.required],
      budget: [null, Validators.required],
      dateDebut: [null, Validators.required],
      dateFin: [null, Validators.required]
    },{ validators: this.dateRangeValidator });
    this.editProjetForm = this.formBuilder.group({
      id: [null, Validators.required],
      intitule: [null, Validators.required],
      budget: [null, Validators.required],
      dateDebut: [null, Validators.required],
      dateFin: [null, Validators.required]
    },{ validators: this.dateRangeValidator });
  }

  dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('dateDebut').value;
    const endDate = formGroup.get('dateFin').value;

    if (startDate && endDate && startDate > endDate) {
      formGroup.get('dateFin').setErrors({ dateRange: true });
    } else {
      formGroup.get('dateFin').setErrors(null);
    }
  }

  getAllProjets() {
    this.projetService.getAllProjets().subscribe(
      (projets: Projet[]) => {
        this.projets = projets;
      }
    );
  }

  addProjet() {
    if (this.newProjetForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const projetData: Projet = {
      intitule: this.newProjetForm.value.intitule,
      budget: this.newProjetForm.value.budget,
      dateDebut: this.newProjetForm.value.dateDebut,
      dateFin: this.newProjetForm.value.dateFin,
    }

    this.projetService.addProjet(projetData).subscribe({
      next: data => {
        console.log('Projet added successfully:', projetData);
        // Reset the form
        this.newProjetForm.reset();
        this.getAllProjets();
      },
      error: err => {
        console.log('Error adding membre:', err);
      }
    })
  }

  loadProjetFormData(projet: Projet) {
    this.editProjetForm.patchValue({
      id: projet.id,
      intitule: projet.intitule,
      budget: projet.budget,
      dateDebut: projet.dateDebut,
      dateFin: projet.dateFin,
    });
  }


  updateProjet() {
    const updatedProjet: Projet = {
      id: this.editProjetForm.value.id,
      budget: this.editProjetForm.value.budget,
      intitule: this.editProjetForm.value.intitule,
      dateFin: this.editProjetForm.value.dateFin,
      dateDebut: this.editProjetForm.value.dateDebut,
    };

    this.projetService.updateProjet(updatedProjet).subscribe(
      (updatedProjet: Projet) => {
        // Handle success, if needed
        this.getAllProjets()
        console.log(updatedProjet)
      }
    );
  }

  deleteProjet(id: number) {
    if (confirm("Etes vous sure !!"))
      this.projetService.deleteProjet(id).subscribe(
        (r) => {
          // Handle success, if needed
          console.log(r)
          this.getAllProjets()
        }
      );
  }
}
