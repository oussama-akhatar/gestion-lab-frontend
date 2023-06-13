import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MembreService} from "../../services/membre.service";
import {Membre} from "../../models/membre.model";
import {Router} from "@angular/router";
import {ResponsableService} from "../../services/responsable.service";
import {Responsable} from "../../models/responsable.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public email: string;
  public password: string;
  public membres: Membre[];
  public responsables: Responsable[];
  public directeurs: Membre[];
  public messageEmail: boolean = true;
  public messagePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private membreService: MembreService,
    private responsableService: ResponsableService,
  ) {
  }

  ngOnInit() {
    this.initLoginForm();
    this.getAllMembres();
    this.getAllResponsables();
    this.getAllDirecteurs();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getAllMembres() {
    this.membreService.getAllMembres().subscribe(
      (Membres: Membre[]) => {
        this.membres = Membres;
        console.log(this.membres)
      }
    );
  }

  getAllResponsables() {
    this.responsableService.getAllResponsables().subscribe(
      (responsables: Responsable[]) => {
        this.responsables = responsables;
        console.log(this.responsables)
      }
    );
  }

  getAllDirecteurs() {
    this.membreService.getAllDirecteurs().subscribe((directeurs) => {
      this.directeurs = directeurs;
      console.log(this.directeurs);
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
      // ===========================================================
      for (let directeur of this.directeurs) {
        if (this.email == directeur.email) {
          this.messageEmail = true;
          if (this.password == directeur.password) {
            this.messagePassword = true;
            sessionStorage.setItem('role', 'directeur');
            sessionStorage.setItem('email', directeur.email);
            // window.location.reload();
            window.location.href = "/dashboard-directeur";
            return;
          } else {
            this.messagePassword = false;
          }
        } else {
          this.messageEmail = false;
        }
      }
      // ===========================================================
      for (let membre of this.membres) {
        if (this.email == membre.email) {
          this.messageEmail = true;
          if (this.password == membre.password) {
            this.messagePassword = true;
            sessionStorage.setItem('role', 'membre');
            sessionStorage.setItem("email", membre.email);
            // window.location.reload();
            window.location.href = "/dashboard-membre";
            return;
          } else {
            this.messagePassword = false;
          }
        } else {
          this.messageEmail = false;
        }
      }
      // ===========================================================
      for (let respo of this.responsables) {
        if (this.email == respo.email) {
          this.messageEmail = true;
          if (this.password == respo.password) {
            this.messagePassword = true;
            sessionStorage.setItem('role', 'respo');
            sessionStorage.setItem('email', respo.email);
            window.location.href = "/dashboard-responsable";
            return;
          } else {
            this.messagePassword = false;
          }
        } else {
          this.messageEmail = false;
        }
      }
      // ===========================================================
    }
  }

}
