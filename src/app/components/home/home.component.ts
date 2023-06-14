import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public etablissementCount: number = 0;
  public laboratoireCount: number = 0;
  public sommeDotationUcaRech: number = 0;
  public membreCount: number = 0;

  public etabCount = 0;
  public labCount = 0;
  public sommeDotationUcaRechCount: number = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
      this.homeService.countEtablissement().subscribe(
        (value: number) => {
          this.etablissementCount = value;
          console.log(value);
        }
      );

      this.homeService.countLaboratoire().subscribe(
        (value: number) => {
          this.laboratoireCount = value;
          console.log(value);
        }
      );

    this.homeService.sommeDotationUcaRech().subscribe(
      (value: number) => {
        this.sommeDotationUcaRech = value;
        console.log(value);
      }
    );
    this.homeService.countMembre().subscribe(
      (value: number) => {
        this.membreCount = value;
        console.log(value);
      }
    )
  }



  etablissementCountStop: any = setInterval(() => {
    this.etabCount++;
    if (this.etabCount == this.etablissementCount) {
      clearInterval(this.etablissementCountStop);
    }
  }, 300);

  laboratoireCountStop: any = setInterval(() => {
    this.labCount++;
    if (this.labCount == this.laboratoireCount) {
      clearInterval(this.laboratoireCountStop);
    }
  }, 300);

  DotationUcaRechCountStop: any = setInterval(() => {
    this.sommeDotationUcaRechCount+=1000;
    if (this.sommeDotationUcaRechCount == this.sommeDotationUcaRech) {
      clearInterval(this.DotationUcaRechCountStop);
    }
  }, 30);
}
