import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Responsable } from 'src/app/models/responsable.model';
import { ResponsableService } from 'src/app/services/responsable.service';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

  responsables: Responsable[] = [];
  newResponsableForm: FormGroup;
  editResponsableForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private responsableService: ResponsableService
  ) { }

  ngOnInit(): void {
    this.initResponsableForm();
    this.getAllResponsables();
  }

  initResponsableForm(): void {
    this.newResponsableForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      dateNaissance: [new Date(), Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      telephone: [null, Validators.required],
      typeResponsabilite: ['RAF', Validators.required]
    });
    this.editResponsableForm = this.formBuilder.group({
      id: [null, Validators.required],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      dateNaissance: [new Date(), Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      telephone: [null, Validators.required],
      typeResponsabilite: [null, Validators.required]
    });
  }

  getAllResponsables() {
    this.responsableService.getAllResponsables().subscribe(
      (responsables: Responsable[]) => {
        this.responsables = responsables;
        console.log(responsables);

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addResponsable(): void {
    if (this.newResponsableForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const responsableData: Responsable = {
      nom: this.newResponsableForm.value.nom,
      prenom: this.newResponsableForm.value.prenom,
      dateNaissance: this.newResponsableForm.value.dateNaissance,
      email: this.newResponsableForm.value.email,
      password: this.newResponsableForm.value.password,
      telephone: this.newResponsableForm.value.telephone,
      typeResponsabilite: this.newResponsableForm.value.typeResponsabilite
    };

    this.responsableService.addResponsable(responsableData).subscribe({
      next: data => {
        console.log('Responsable added successfully:', responsableData);
        // Reset the form
        this.newResponsableForm.reset();
        this.getAllResponsables();
      },
      error: err => {
        console.log('Error adding Responsable:', err);
      }
    });
  }

  loadResponsableFormData(responsable: Responsable) {
    this.editResponsableForm.patchValue({
      id: responsable.id,
      nom: responsable.nom,
      prenom: responsable.prenom,
      dateNaissance: responsable.dateNaissance,
      email: responsable.email,
      password: responsable.password,
      telephone: responsable.telephone,
      typeResponsabilite: responsable.typeResponsabilite
    });
  }

  updateResponsable(): void {
    const updatedResponsable: Responsable = {
      id: this.editResponsableForm.value.id,
      nom: this.editResponsableForm.value.nom,
      prenom: this.editResponsableForm.value.prenom,
      dateNaissance: this.editResponsableForm.value.dateNaissance,
      email: this.editResponsableForm.value.email,
      password: this.editResponsableForm.value.password,
      telephone: this.editResponsableForm.value.telephone,
      typeResponsabilite: this.editResponsableForm.value.typeResponsabilite
    }
    console.log(updatedResponsable);
    this.responsableService.updateResponsable(updatedResponsable).subscribe({
      next: data => {
        console.log('Responsable updated successfully:', updatedResponsable);
        this.getAllResponsables();
      },
      error: err => {
        console.log('Error adding Responsable:', err);
      }
    });
  }

  deleteResponsable(id: number) {
    if (confirm("Etes vous sure !!"))
      this.responsableService.deleteResponsable(id).subscribe({
        next: data => {
          // Handle success, if needed
          console.log(data);
          this.getAllResponsables();
        },
        error: err => {
          console.error(err);
        }
      });
  }

}
