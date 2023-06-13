import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from "ngx-webstorage";
import { MembreService } from "../../services/membre.service";
import { Membre } from "../../models/membre.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypeBesoin } from "../../models/typeBesoin.model";
import { TypeBesoinService } from "../../services/type-besoin.service";
import { ExpressionBesoinService } from "../../services/expression-besoin.service";
import { ExpressionBesoin } from "../../models/expressionBesoin.model";

@Component({
  selector: 'app-dashborard-membre',
  templateUrl: './dashborard-membre.component.html',
  styleUrls: ['./dashborard-membre.component.css']
})
export class DashborardMembreComponent implements OnInit {
  public sessionValue: any = "";
  public email: any = "";
  public membres: Membre[] = [];
  public membre: Membre;
  newExpressionBesoinForm: FormGroup;
  typeBesoins: TypeBesoin[] = [];

  constructor(
    private membreService: MembreService,
    private fb: FormBuilder,
    private typeBesoinService: TypeBesoinService,
    private expressionBesoinService: ExpressionBesoinService
  ) { }

  ngOnInit(): void {
    this.getAllMembres();
    this.sessionValue = sessionStorage.getItem('role');
    this.email = sessionStorage.getItem('email');
    this.getAllTypeBesoins();
    this.initForm();
  }

  initForm() {
    this.newExpressionBesoinForm = this.fb.group({
      description: ['', Validators.required],
      montant: [0, Validators.required],
      typeBesoin: ['', Validators.required]
    })
  }

  getAllTypeBesoins() {
    this.typeBesoinService.getAllTypeBesoins().subscribe(
      data => this.typeBesoins = data
    );
  }

  getAllMembres() {
    this.membreService.getAllMembres().subscribe(
      (res) => {
        for (let membre of res) {
          if (this.email == membre.email) {
            this.membre = membre;
            console.log(this.membre);
          } else {
            console.log("dd")
          }
        }
      });
  }


  addExpressionBesoin() {
    let expressionBesoinAdded: ExpressionBesoin = {
      id: null,
      description: this.newExpressionBesoinForm.value.description,
      validerDirecteur: null,
      responsable: null,
      dateValidation: null,
      dateDemande: new Date(),
      montant: this.newExpressionBesoinForm.value.montant,
      montantEffectif: null,
      typeBesoin: {
        id: this.newExpressionBesoinForm.value.typeBesoin.id
      },
      membre: {
        id: this.membre.id
      }
    }

    console.log(expressionBesoinAdded);
    this.expressionBesoinService.addExpressionBesoin(expressionBesoinAdded).subscribe((expressionBesoinAdded: ExpressionBesoin) => {
      console.log(expressionBesoinAdded);
      this.getAllMembres();
    });
  }

  deleteExpressionBesoin(id: number) {
    if (confirm("Etes vous sure !!"))
      this.expressionBesoinService.deleteExpressionBesoin(id).subscribe(
        (r) => {
          console.log(r);
          this.getAllMembres();
        }
      );
  }
}
