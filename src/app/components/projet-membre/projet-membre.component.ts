import { Component, OnInit } from '@angular/core';
import { Projet } from "../../models/projet.model";
import { ProjetMembre } from "../../models/projetMembre.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjetService } from "../../services/projet.service";
import { ProjetMembreService } from "../../services/projet-membre.service";
import { Membre } from "../../models/membre.model";
import { MembreService } from "../../services/membre.service";
import { Laboratoire } from "../../models/laboratoire.model";

@Component({
  selector: 'app-projet-membre',
  templateUrl: './projet-membre.component.html',
  styleUrls: ['./projet-membre.component.css']
})
export class ProjetMembreComponent implements OnInit {
  newProjetMembreForm: FormGroup;
  editProjetMembreForm: FormGroup;
  projetsMembres: ProjetMembre[];
  membres: Membre[];
  projets: Projet[];

  constructor(
    private formBuilder: FormBuilder,
    private projetMembreService: ProjetMembreService,
    private membreService: MembreService,
    private projetService: ProjetService
  ) { }

  ngOnInit(): void {
    this.getAllProjetsMembres();
    this.loadMembres();
    this.loadProjets();
    this.initProjetMembreForm();
  }

  initProjetMembreForm() {
    this.newProjetMembreForm = this.formBuilder.group({
      dotateurProjet: [null, Validators.required],
      responsableProjet: [false, Validators.required],
      projet: [null, Validators.required],
      membre: [null, Validators.required]
    });
    this.editProjetMembreForm = this.formBuilder.group({
      id: [null, Validators.required],
      dotateurProjet: [null, Validators.required],
      responsableProjet: [null, Validators.required],
      projet: [null, Validators.required],
      membre: [null, Validators.required]
    })
  }

  loadMembres(): void {
    this.membreService.getAllMembres().subscribe(
      (membres: Membre[]) => {
        this.membres = membres;
      }
    );
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      (projets: Projet[]) => {
        this.projets = projets;
      }
    );
  }

  getAllProjetsMembres() {
    this.projetMembreService.getAllProjetsMembres().subscribe(
      (projetMembres: ProjetMembre[]) => {
        this.projetsMembres = projetMembres;
      }
    );
  }

  addProjetMembre() {
    if (this.newProjetMembreForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const projetMembreData: ProjetMembre = {
      dotateurProjet: this.newProjetMembreForm.value.dotateurProjet,
      responsableProjet: this.newProjetMembreForm.value.responsableProjet,
      projet: {
        id: this.newProjetMembreForm.value.projet.id
      },
      membre: {
        id: this.newProjetMembreForm.value.membre.id
      }
    };

    this.projetMembreService.addProjetMembre(projetMembreData).subscribe({
      next: data => {
        console.log('Membre added successfully:', projetMembreData);
        // Reset the form
        this.newProjetMembreForm.reset();
        this.getAllProjetsMembres();
      }
    })
  }

  loadProjetMembreFormData(projetMembre: ProjetMembre) {
    this.editProjetMembreForm.patchValue({
      id: projetMembre.id,
      dotateurProjet: projetMembre.dotateurProjet,
      responsableProjet: projetMembre.responsableProjet,
      projet: projetMembre.projet,
      membre: projetMembre.membre
    });
  }

  updateProjetMembre() {
    const updatedProjetMembre: ProjetMembre = {
      id: this.editProjetMembreForm.value.id,
      responsableProjet: this.editProjetMembreForm.value.responsableProjet,
      dotateurProjet: this.editProjetMembreForm.value.dotateurProjet,
      projet: {
        id: this.editProjetMembreForm.value.projet.id
      },
      membre: {
        id: this.editProjetMembreForm.value.membre.id
      }
    }

    this.projetMembreService.updateProjetMembre(updatedProjetMembre).subscribe(
      (updatedProjetMembre: ProjetMembre) => {
        this.getAllProjetsMembres();
        console.log(updatedProjetMembre);
      }
    )
  }

  deleteProjetMembre(id: number) {
    if (confirm("Etes vous sure !!"))
      this.projetMembreService.deleteProjetMembre(id).subscribe(
        (r) => {
          console.log(r);
          this.getAllProjetsMembres();
        }
      );
  }
}
