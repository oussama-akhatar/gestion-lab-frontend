import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Responsable } from 'src/app/models/responsable.model';
import { ExpressionBesoin } from 'src/app/models/expressionBesoin.model';
import { ExpressionBesoinService } from 'src/app/services/expression-besoin.service';
import { ResponsableService } from 'src/app/services/responsable.service';

@Component({
  selector: 'app-dashboard-responsable',
  templateUrl: './dashboard-responsable.component.html',
  styleUrls: ['./dashboard-responsable.component.css']
})
export class DashboardResponsableComponent implements OnInit {

  sessionValue: any = '';
  email!: string;
  responsables: Responsable[] = [];
  public responsable: Responsable;
  expressionBesoins: ExpressionBesoin[] = [];
  addEBMontantEffectifForm: FormGroup;

  constructor(
    private responsableService: ResponsableService,
    private fb: FormBuilder,
    private expressionBesoinService: ExpressionBesoinService
  ) { }


  ngOnInit(): void {
    this.getExpressionBesoins();
    this.sessionValue = sessionStorage.getItem('role');
    this.email = sessionStorage.getItem('email');
    this.initForm();
  }

  initForm() {
    this.addEBMontantEffectifForm = this.fb.group({
      id: ['', Validators.required],
      montantEffectif: [0, Validators.required]
    })
  }

  loadEBMontantEffectifFormData(expressionBesoin: ExpressionBesoin) {
    this.addEBMontantEffectifForm.patchValue({
      id: expressionBesoin.id,
      montantEffectif: expressionBesoin.montantEffectif,
    });
  }


  addEBMontantEffectif() {
    let expressionBesoin: ExpressionBesoin = {
      id: this.addEBMontantEffectifForm.value.id,
      montantEffectif: this.addEBMontantEffectifForm.value.montantEffectif,
    }

    this.expressionBesoinService.updateExpressionBesoin(expressionBesoin).subscribe(
      (updatedExpressionBesoin: ExpressionBesoin) => {
        this.getExpressionBesoins();
        console.log(updatedExpressionBesoin);
      }
    );
  }

  getExpressionBesoins() {
    this.responsableService.getAllResponsables().subscribe(
      (res) => {
        for (let responsable of res) {
          if (this.email == responsable.email) {
            this.responsable = responsable;
            console.log(responsable);
            this.expressionBesoinService.getEBsByResponsable(responsable.id).subscribe(
              (expressionBesoins: ExpressionBesoin[]) => {
                this.expressionBesoins = expressionBesoins;
                // for (let exp of expressionBesoins) {
                //   if (exp.validerDirecteur) {
                //     this.expressionBesoins.push(exp);
                //     console.log(expressionBesoins);
                //   }
                // }
              },
              (error: any) => {
                console.error(error);
              }
            );
            return;
          } else {
            console.log("Not found!!!")
          }
        }
      })
  }

}
