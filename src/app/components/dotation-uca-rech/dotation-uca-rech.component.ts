import {Component, OnInit} from '@angular/core';
import {DotationUcaRech} from "../../models/dotationUcaRech.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DotationUcaRechService} from "../../services/dotation-uca-rech.service";
import {Projet} from "../../models/projet.model";

@Component({
  selector: 'app-dotation-uca-rech',
  templateUrl: './dotation-uca-rech.component.html',
  styleUrls: ['./dotation-uca-rech.component.css']
})
export class DotationUcaRechComponent implements OnInit {

  public dotationUcaReches: DotationUcaRech[] = [];
  public newDotationUcaRechForm: FormGroup;
  public editDotationUcaRechForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dotationUcaRechService: DotationUcaRechService
  ) {
  }

  ngOnInit(): void {
    this.getAllDotationUcaRechs();
    this.initDotationUcaRechForm();
  }

  initDotationUcaRechForm() {
    this.newDotationUcaRechForm = this.formBuilder.group({
      annee: [null, Validators.required],
      dotateurBase: [null, Validators.required]
    });
    this.editDotationUcaRechForm = this.formBuilder.group({
      id: [null, Validators.required],
      annee: [null, Validators.required],
      dotateurBase: [null, Validators.required]
    });
  }

  getAllDotationUcaRechs(): void {
    this.dotationUcaRechService.getAllDotationUcaRechs().subscribe(
      data => {
        this.dotationUcaReches = data
        console.log(data)
      }
    );
  }

  addDotationUcaRech() {
    if (this.newDotationUcaRechForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const dotationUcaRechData: DotationUcaRech = {
      annee: this.newDotationUcaRechForm.value.annee,
      dotateurBase: this.newDotationUcaRechForm.value.dotateurBase
    }

    this.dotationUcaRechService.addDotationUcaRech(dotationUcaRechData).subscribe({
      next: data => {
        console.log('Projet added successfully:', dotationUcaRechData);
        // Reset the form
        this.newDotationUcaRechForm.reset();
        this.getAllDotationUcaRechs();
      },
      error: err => {
        console.log('Error adding membre:', err);
      }
    });
  }

  loadDotationUcaRechFormData(dotationUcaRech: DotationUcaRech) {
    this.editDotationUcaRechForm.patchValue({
      id: dotationUcaRech.id,
      annee: dotationUcaRech.annee,
      dotateurBase: dotationUcaRech.dotateurBase
    });
  }

  updateDotationUcaRech() {
    const updatedDotationUcaRech: DotationUcaRech = {
      id: this.editDotationUcaRechForm.value.id,
      annee: this.editDotationUcaRechForm.value.annee,
      dotateurBase: this.editDotationUcaRechForm.value.dotateurBase
    };

    this.dotationUcaRechService.editDotationUcaRech(updatedDotationUcaRech).subscribe(
      (updatedProjet: Projet) => {
        // Handle success, if needed
        this.getAllDotationUcaRechs();
        console.log(updatedProjet);
      }
    );
  }

  deleteDotationUcaRech(id: number) {
    if (confirm("Etes vous sure !!"))
      this.dotationUcaRechService.deleteDotationUcaRech(id).subscribe(
        (r) => {
          // Handle success, if needed
          console.log(r)
          this.getAllDotationUcaRechs();
        }
      );
  }
}
