import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { NavbarComponent } from './components/navbar/navbar.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewEtablissementComponent } from './components/etablissement/new-etablissement/new-etablissement.component';
>>>>>>> f7dadb1e08b67d1601646b5fd1d72fab1305c803

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
=======
    NavbarComponent,
    EtablissementComponent,
    NewEtablissementComponent
>>>>>>> f7dadb1e08b67d1601646b5fd1d72fab1305c803
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
