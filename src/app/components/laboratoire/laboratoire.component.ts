import { Component, OnInit } from '@angular/core';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { LaboratoireService } from 'src/app/services/laboratoire.service';

@Component({
  selector: 'app-laboratoire',
  templateUrl: './laboratoire.component.html',
  styleUrls: ['./laboratoire.component.css']
})
export class LaboratoireComponent implements OnInit {

  laboratoires?: Laboratoire[];
  laboratoire!: Laboratoire;

  constructor(private laboratoireService: LaboratoireService) { }

  ngOnInit(): void {
    this.getLaboratoires();
  }

  getLaboratoires(): void {
    this.laboratoireService.getAll().subscribe({
      next: (data) => {
        this.laboratoires = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

}
