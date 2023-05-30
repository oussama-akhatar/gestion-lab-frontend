import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EtablissementService} from "../../../services/etablissement.service";
import {Etablissement} from "../../../models/Etablissement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-etablissement',
  templateUrl: './new-etablissement.component.html',
  styleUrls: ['./new-etablissement.component.css']
})
export class NewEtablissementComponent implements OnInit{
  public etablissementForm !: FormGroup;

  constructor(private fb : FormBuilder, private etablissementService : EtablissementService, private route: Router) {}

  ngOnInit(): void {
    this.etablissementForm = this.fb.group({
      intitule : this.fb.control('',[Validators.required]),
      adresse : this.fb.control('', [Validators.required])
    })
  }

  saveEtablissement() {
    let etablissement: Etablissement = this.etablissementForm.value;
    this.etablissementService.addEtablissement(etablissement).subscribe({
      next : value => {
        console.log(value);
        this.route.navigate(['/etablissement']).then(r => console.log(r));
      },
      error : err => {
        console.log(err);
      }
    })
  }

}
