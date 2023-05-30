import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EtablissementService} from "../../../services/etablissement.service";

@Component({
  selector: 'app-new-etablissement',
  templateUrl: './new-etablissement.component.html',
  styleUrls: ['./new-etablissement.component.css']
})
export class NewEtablissementComponent implements OnInit{
  public etablissementForm !: FormGroup;

  constructor(private fb : FormBuilder, private etabllissementService : EtablissementService) {}

  ngOnInit(): void {
    this.etablissementForm = this.fb.group({
      nom : this.fb.control('',[Validators.required]),
      adresse : this.fb.control('', [Validators.required])
    })
  }

}
