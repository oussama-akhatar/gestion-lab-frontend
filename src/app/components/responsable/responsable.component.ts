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
      telephone: [null, Validators.required],
      type: [null, Validators.required]
    });
    this.editResponsableForm = this.formBuilder.group({
      id: [null, Validators.required],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      dateNaissance: [new Date(), Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telephone: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  getAllResponsables() {
    this.responsableService.getAllResponsables().subscribe(
      (responsables: Responsable[]) => {
        this.responsables = responsables;
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

    const ResponsableData: Responsable = {
      nom: this.newResponsableForm.value.nom,
      prenom: this.newResponsableForm.value.prenom,
      dateNaissance: this.newResponsableForm.value.dateNaissance,
      email: this.newResponsableForm.value.email,
      telephone: this.newResponsableForm.value.telephone,
      type: this.newResponsableForm.value.type
    };

    this.responsableService.addResponsable(ResponsableData).subscribe({
      next: data => {
        console.log('Responsable added successfully:', ResponsableData);
        // Reset the form
        this.newResponsableForm.reset();
        this.getAllResponsables();
      },
      error: err => {
        console.log('Error adding Responsable:', err);
      }
    });
  }

  loadResponsableFormData(Responsable: Responsable) {
    this.editResponsableForm.patchValue({
      id: Responsable.id,
      nom: Responsable.nom,
      prenom: Responsable.prenom,
      dateNaissance: Responsable.dateNaissance,
      email: Responsable.email,
      telephone: Responsable.telephone
    });
  }

  updateResponsable(): void {
    const updatedResponsable: Responsable = {
      id: this.editResponsableForm.value.id,
      nom: this.editResponsableForm.value.nom,
      prenom: this.editResponsableForm.value.prenom,
      dateNaissance: this.editResponsableForm.value.dateNaissance,
      email: this.editResponsableForm.value.email,
      telephone: this.editResponsableForm.value.telephone,
      type: this.newResponsableForm.value.type
    }
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
