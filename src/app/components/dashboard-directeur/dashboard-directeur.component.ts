import {Component} from '@angular/core';
import {Membre} from "../../models/membre.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeBesoin} from "../../models/typeBesoin.model";
import {MembreService} from "../../services/membre.service";
import {TypeBesoinService} from "../../services/type-besoin.service";
import {ExpressionBesoinService} from "../../services/expression-besoin.service";
import {ExpressionBesoin} from "../../models/expressionBesoin.model";
import {Observable, of} from "rxjs";
import {Responsable} from "../../models/responsable.model";
import {ResponsableService} from "../../services/responsable.service";

@Component({
  selector: 'app-dashboard-directeur',
  templateUrl: './dashboard-directeur.component.html',
  styleUrls: ['./dashboard-directeur.component.css']
})
export class DashboardDirecteurComponent {
  public sessionValue: any = "";
  public email: any = "";
  public membres: Membre[] = [];
  public directeur: Membre;
  public lab: string = "";
  public membresOfLabo: Membre[] = [];
  responsables: Responsable[] = [];
  editExpressionBesoinForm: FormGroup;

  constructor(private membreService: MembreService,private responsableService: ResponsableService, private formBuilder: FormBuilder, private typeBesoinService: TypeBesoinService, private expressionBesoinService: ExpressionBesoinService) {
  }

  ngOnInit(): void {
    this.getAllMembres();
    this.sessionValue = sessionStorage.getItem('role');
    this.email = sessionStorage.getItem('email');
    this.getAllMembresLaboratoire();
    this.initExpressionBesoinForm();
    this.loadResponsables();
  }

  loadResponsables(): void {
    this.responsableService.getAllResponsables().subscribe(
      (responsables: Responsable[]) => {
        this.responsables = responsables;
      }
    );
  }

  initExpressionBesoinForm(): void {
    this.editExpressionBesoinForm = this.formBuilder.group({
      id: [null, Validators.required],
      description: [null, Validators.required],
      dateDemande: [null, Validators.required],
      dateValidation: [new Date(), Validators.required],
      validerDirecteur: [null, Validators.required],
      membre: [null, Validators.required],
      montant: [null,Validators.required],
      montantEffectif: [null,Validators.required],
      responsable: [null, Validators.required],
      typeBesoin: [null, Validators.required]
    });
  }

  getAllMembres() {
    this.membreService.getAllDirecteurs().subscribe(
      (res) => {
        for (let membre of res) {
          if (this.email == membre.email) {
            this.directeur = membre;
            this.lab = membre.laboratoire.intitule;
          }
        }
      });
  }

  getAllMembresLaboratoire() {
    this.membreService.getAllMembres().subscribe((membres) => {
      for (let membre of membres) {
        if (membre.directeur == false) {
          if (membre.laboratoire.intitule == this.lab) {
            console.log(membre.laboratoire.id);
            this.membreService.getAllMembresLabo(membre.laboratoire.id).subscribe((res)=>{
              this.membresOfLabo = res;
            });
            return;
          }
        }
      }
      console.log(this.membresOfLabo);
    });
  }

  deleteExpressionBesoin(id: number) {

  }

  loadExpressionBesoinFormData(expressionBesoin: ExpressionBesoin, membre : Membre) {
    this.editExpressionBesoinForm.patchValue({
      id: expressionBesoin.id,
      description: expressionBesoin.description,
      dateDemande: expressionBesoin.dateDemande,
      dateValidation: new Date(),
      montant: expressionBesoin.montant,
      montantEffectif: expressionBesoin.montantEffectif,
      validerDirecteur: true,
      membre: membre,
      responsable: expressionBesoin.responsable,
      typeBesoin: expressionBesoin.typeBesoin
    });
  }

  updateExpressionBesoin() {
    const updatedExpressionBesoin: ExpressionBesoin = {
      id: this.editExpressionBesoinForm.value.id,
      description: this.editExpressionBesoinForm.value.description,
      dateDemande: this.editExpressionBesoinForm.value.dateDemande,
      dateValidation: new Date(),
      montant: this.editExpressionBesoinForm.value.montant,
      montantEffectif: this.editExpressionBesoinForm.value.montantEffectif,
      validerDirecteur: this.editExpressionBesoinForm.value.validerDirecteur,
      membre: {
        id: this.editExpressionBesoinForm.value.membre.id
      },
      responsable: {
        id: this.editExpressionBesoinForm.value.responsable.id
      },
      typeBesoin: {
        id: this.editExpressionBesoinForm.value.typeBesoin.id
      }
    }

    console.log(updatedExpressionBesoin);

    this.expressionBesoinService.updateExpressionBesoin(updatedExpressionBesoin).subscribe(
      (updatedExpressionBesoin: ExpressionBesoin) => {
        // window.location.reload();
        this.ngOnInit();
        console.log(updatedExpressionBesoin);
      }
    );
  }
}
