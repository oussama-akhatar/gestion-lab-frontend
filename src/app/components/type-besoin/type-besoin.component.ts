import {Component, OnInit} from '@angular/core';
import {Etablissement} from "../../models/etablissement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeBesoin} from "../../models/typeBesoin.model";
import {EtablissementService} from "../../services/etablissement.service";
import {TypeBesoinService} from "../../services/type-besoin.service";

@Component({
  selector: 'app-type-besoin',
  templateUrl: './type-besoin.component.html',
  styleUrls: ['./type-besoin.component.css']
})
export class TypeBesoinComponent implements OnInit{
  public typeBesoins: TypeBesoin[] = [];
  public newTypeBesoinForm: FormGroup;
  public editTypeBesoinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private typeBesoinService: TypeBesoinService
  ) {}

  ngOnInit(): void {
    this.getAllTypeBesoins();
    this.newTypeBesoinForm = this.fb.group({
      description: this.fb.control('', [Validators.required]),
    });
    this.editTypeBesoinForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
    });
  }

  getAllTypeBesoins() {
    this.typeBesoinService.getAllTypeBesoins().subscribe(
      data => this.typeBesoins = data
    );
  }


  addTypeBesoin() {
    let typeBesoin: TypeBesoin = this.newTypeBesoinForm.value;
    this.typeBesoinService.addTypeBesoin(typeBesoin).subscribe({
      next: value => {
        console.log(value);
        this.getAllTypeBesoins();
        this.newTypeBesoinForm.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }


  loadTypeBesoinData(typeBesoin: TypeBesoin) {
    this.editTypeBesoinForm.patchValue({
      id: typeBesoin.id,
      description: typeBesoin.description
    });
  }


  editTypeBesoin() {
    const updatedTypeBesoin: TypeBesoin = {
      id: this.editTypeBesoinForm.value.id,
      description: this.editTypeBesoinForm.value.description
    }

    this.typeBesoinService.editTypeBesoin(updatedTypeBesoin).subscribe(
      (updatedTypeBesoin: TypeBesoin) => {
        console.log(updatedTypeBesoin);
        this.getAllTypeBesoins();
      });
  }

  deleteTypeBesoin(typeBesoin: TypeBesoin) {
    if (confirm("Etes vous sure ??"))
      this.typeBesoinService.deleteTypeBesoin(typeBesoin).subscribe({
        next: value => {
          this.typeBesoins = this.typeBesoins.filter(e => e.id != typeBesoin.id);
        }
      });
  }
}
