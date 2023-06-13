import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sessionValue;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    // window.location.reload();
    this.sessionValue = sessionStorage.getItem('role');
    console.log(this.sessionValue);
  }

  logout() {
    sessionStorage.removeItem('role');
    window.location.href = "/";
  }
}
