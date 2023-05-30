import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewEtablissementComponent } from './components/etablissement/new-etablissement/new-etablissement.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EtablissementComponent,
    NewEtablissementComponent
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
