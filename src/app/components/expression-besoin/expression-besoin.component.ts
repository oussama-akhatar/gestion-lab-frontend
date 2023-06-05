import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpressionBesoin } from 'src/app/models/expressionBesoin.model';
import { Membre } from 'src/app/models/membre.model';
import { Responsable } from 'src/app/models/responsable.model';
import { TypeBesoin } from 'src/app/models/typeBesoin.model';
import { ExpressionBesoinService } from 'src/app/services/expression-besoin.service';
import { MembreService } from 'src/app/services/membre.service';
import { ResponsableService } from 'src/app/services/responsable.service';
import { TypeBesoinService } from 'src/app/services/type-besoin.service';

@Component({
  selector: 'app-expression-besoin',
  templateUrl: './expression-besoin.component.html',
  styleUrls: ['./expression-besoin.component.css']
})
export class ExpressionBesoinComponent implements OnInit {

  expressionBesoins: ExpressionBesoin[] = [];
  membres: Membre[] = [];
  responsables: Responsable[] = [];
  typeBesoins: TypeBesoin[] = [];
  newExpressionBesoinForm: FormGroup;
  editExpressionBesoinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private expressionBesoinService: ExpressionBesoinService,
    private membreService: MembreService,
    private responsableService: ResponsableService,
    private typeBesoinService: TypeBesoinService
  ) { }

  ngOnInit(): void {
    this.initExpressionBesoinForm();
    this.getAllExpressionBesoins();
    this.loadMembres();
    this.loadResponsables();
    this.loadTypeBesoins();
  }

  initExpressionBesoinForm(): void {
    this.newExpressionBesoinForm = this.formBuilder.group({
      description: [null, Validators.required],
      validerDirecteur: [false, Validators.required],
      membre: [null, Validators.required],
      responsable: [null, Validators.required],
      typeBesoin: [null, Validators.required]
    });
    this.editExpressionBesoinForm = this.formBuilder.group({
      id: [null, Validators.required],
      description: [null, Validators.required],
      validerDirecteur: [null, Validators.required],
      membre: [null, Validators.required],
      responsable: [null, Validators.required],
      typeBesoin: [null, Validators.required]
    });
  }

  loadMembres(): void {
    this.membreService.getAllMembres().subscribe(
      (membres: Membre[]) => {
        this.membres = membres;
      }
    );
  }

  loadResponsables(): void {
    this.responsableService.getAllResponsables().subscribe(
      (responsables: Responsable[]) => {
        this.responsables = responsables;
      }
    );
  }

  loadTypeBesoins(): void {
    this.typeBesoinService.getAllTypeBesoins().subscribe(
      (typeBesoins: TypeBesoin[]) => {
        this.typeBesoins = typeBesoins;
      }
    );
  }

  getAllExpressionBesoins() {
    this.expressionBesoinService.getAllExpressionBesoins().subscribe(
      (expressionBesoins: ExpressionBesoin[]) => {
        this.expressionBesoins = expressionBesoins;
        console.log(expressionBesoins);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addExpressionBesoin(): void {
    if (this.newExpressionBesoinForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const expressionBesoinData: ExpressionBesoin = {
      description: this.newExpressionBesoinForm.value.description,
      validerDirecteur: this.newExpressionBesoinForm.value.validerDirecteur,
      membre: {
        id: this.newExpressionBesoinForm.value.membre.id
      },
      responsable: {
        id: this.newExpressionBesoinForm.value.responsable.id
      },
      typeBesoin: {
        id: this.newExpressionBesoinForm.value.typeBesoin.id
      }
    };

    this.expressionBesoinService.addExpressionBesoin(expressionBesoinData).subscribe({
      next: data => {
        console.log('ExpressionBesoin added successfully:', expressionBesoinData);
        // Reset the form
        this.newExpressionBesoinForm.reset();
        // this.ngOnInit();
        this.getAllExpressionBesoins(); // ! change
      },
      error: err => {
        console.log('Error adding ExpressionBesoin:', err);
      }
    });
  }

  loadExpressionBesoinFormData(expressionBesoin: ExpressionBesoin) {
    this.editExpressionBesoinForm.patchValue({
      id: expressionBesoin.id,
      description: expressionBesoin.description,
      validerDirecteur: expressionBesoin.validerDirecteur,
      membre: expressionBesoin.membre,
      responsable: expressionBesoin.responsable,
      typeBesoin: expressionBesoin.typeBesoin
    });
  }

  updateExpressionBesoin() {
    const updatedExpressionBesoin: ExpressionBesoin = {
      id: this.editExpressionBesoinForm.value.id,
      description: this.editExpressionBesoinForm.value.description,
      validerDirecteur: this.editExpressionBesoinForm.value.validerDirecteur,
      membre: this.editExpressionBesoinForm.value.membre,
      responsable: this.editExpressionBesoinForm.value.responsable,
      typeBesoin: this.editExpressionBesoinForm.value.typeBesoin
    }

    this.expressionBesoinService.updateExpressionBesoin(updatedExpressionBesoin).subscribe(
      (updatedExpressionBesoin: ExpressionBesoin) => {
        this.getAllExpressionBesoins();
        console.log(updatedExpressionBesoin);
      }
    )
  }

  deleteExpressionBesoin(id: number) {
    if (confirm("Etes vous sure !!"))
      this.expressionBesoinService.deleteExpressionBesoin(id).subscribe(
        (r) => {
          console.log(r);
          this.getAllExpressionBesoins();
        }
      );
  }

}
