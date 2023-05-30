import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { LaboratoireService } from 'src/app/services/laboratoire.service';

@Component({
  selector: 'app-new-laboratoire',
  templateUrl: './new-laboratoire.component.html',
  styleUrls: ['./new-laboratoire.component.css']
})
export class NewLaboratoireComponent implements OnInit {

  newLabFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private laboratoireService: LaboratoireService, private router: Router) {

  }

  ngOnInit(): void {
    this.newLabFormGroup = this.fb.group({
      intitule: this.fb.control(null, [Validators.required]),
      departement: this.fb.control(null, [Validators.required])
    });
  }

  saveLaboratoire() {
    let laboratoire: Laboratoire = this.newLabFormGroup.value;
    this.laboratoireService.create(laboratoire).subscribe({
      next: data => {
        alert("Laboratoire has been successfully saved!");
        //this.newLabFormGroup.reset();
        this.router.navigateByUrl("/laboratoires");
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
