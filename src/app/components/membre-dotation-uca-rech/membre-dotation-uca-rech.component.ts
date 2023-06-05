import {Component, OnInit} from '@angular/core';
import {MembreDotationUcaRechService} from "../../services/membre-dotation-uca-rech.service";
import {MembreDotationUcaRech} from "../../models/membreDotationUcaRech.model";
import {Membre} from "../../models/membre.model";
import {MembreService} from "../../services/membre.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DotationUcaRech} from "../../models/dotationUcaRech.model";
import {DotationUcaRechService} from "../../services/dotation-uca-rech.service";

@Component({
  selector: 'app-membre-dotation-uca-rech',
  templateUrl: './membre-dotation-uca-rech.component.html',
  styleUrls: ['./membre-dotation-uca-rech.component.css']
})
export class MembreDotationUcaRechComponent implements OnInit{

  membreDotationUcaRechs: MembreDotationUcaRech[] = [];
  membres: Membre[] = [];
  dotationUcaRechs: DotationUcaRech[] = [];
  newMembreDotationForm: FormGroup;
  editMembreDotationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private membreDotationUcaRechService: MembreDotationUcaRechService,
    private dotationUcaRechService: DotationUcaRechService,
    private membreService: MembreService,
  ) {
  }

  ngOnInit(): void {
    this.initMembreDotationUcaRechForm();
    this.getAllMembreDotationUcaRechs();
    this.getAllDotationUcaRechs()
    this.getAllMembres();
  }

  initMembreDotationUcaRechForm() {
    this.newMembreDotationForm = this.formBuilder.group({
      dotationMembre: [null, Validators.required],
      membre: [null, Validators.required],
      dotationUCARech: [null, Validators.required]
    });
    this.editMembreDotationForm = this.formBuilder.group({
      id: [null, Validators.required],
      dotationMembre: [null, Validators.required],
      membre: [null, Validators.required],
      dotationUCARech: [null, Validators.required]
    });
  }

  getAllDotationUcaRechs(): void {
    this.dotationUcaRechService.getAllDotationUcaRechs().subscribe(
      (dotationUcaRechs: DotationUcaRech[]) => {
        this.dotationUcaRechs = dotationUcaRechs
        console.log(this.dotationUcaRechs);
      }
    );
  }

  getAllMembres() {
    this.membreService.getAllMembres().subscribe(
      (Membres: Membre[]) => {
        this.membres = Membres;
        console.log(this.membres);
      }
    );
  }

  getAllMembreDotationUcaRechs() {
    this.membreDotationUcaRechService.getAllMembreDotationUcaRechs().subscribe(
      (membreDotationUcaRechs: MembreDotationUcaRech[]) => {
        this.membreDotationUcaRechs = membreDotationUcaRechs;
        console.log(membreDotationUcaRechs);
      }
    );
  }

  addMembreDotation() {
    if (this.newMembreDotationForm.invalid) {
      console.log('Invalid form');
      return;
    }

    console.log(this.newMembreDotationForm.value.membre.id);
    console.log(this.newMembreDotationForm.value.dotationUCARech.id);

    const membreDotationData: MembreDotationUcaRech = {
      dotationMembre: this.newMembreDotationForm.value.dotationMembre,
      membre: {
        id: this.newMembreDotationForm.value.membre.id
      },
      dotationUCARech: {
        id: this.newMembreDotationForm.value.dotationUCARech.id
      }
    };

    console.log(membreDotationData);

    this.membreDotationUcaRechService.addMembreDotationUcaRech(membreDotationData).subscribe({
      next: data => {
        console.log('Membre added successfully:', membreDotationData);
        // Reset the form
        this.newMembreDotationForm.reset();
        this.getAllMembreDotationUcaRechs();
      }
    });
  }

  loadMembreDotationFormData(membreDotationUcaRech: MembreDotationUcaRech) {
    this.editMembreDotationForm.patchValue({
      id: membreDotationUcaRech.id,
      dotationMembre: membreDotationUcaRech.dotationMembre,
      membre: membreDotationUcaRech.membre,
      dotationUCARech: membreDotationUcaRech.dotationUCARech
    });
  }

  updateMembreDotation() {
    const updatedMembreDotationData: MembreDotationUcaRech = {
      id: this.editMembreDotationForm.value.id,
      dotationMembre: this.editMembreDotationForm.value.dotationMembre,
      membre: {
        id: this.editMembreDotationForm.value.membre.id
      },
      dotationUCARech: {
        id: this.editMembreDotationForm.value.dotationUCARech.id
      }
    };
    this.membreDotationUcaRechService.updateMembreDotationUcaRech(updatedMembreDotationData).subscribe(
      (updatedMembreDotationData: MembreDotationUcaRech) => {
        this.getAllMembreDotationUcaRechs();
        console.log(updatedMembreDotationData);
      }
    )
  }

  deleteMembreDotation(id: number) {
    if (confirm("Etes vous sure !!"))
      this.membreDotationUcaRechService.deleteMembreDotationUcaRech(id).subscribe(
        (r) => {
          console.log(r);
          this.getAllMembreDotationUcaRechs();
        }
      );
  }
}
