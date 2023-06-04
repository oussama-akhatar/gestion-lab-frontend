import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { MembreComponent } from './components/membre/membre.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetMembreComponent } from './components/projet-membre/projet-membre.component';
import { ExpressionBesoinComponent } from './components/expression-besoin/expression-besoin.component';
import { TypeBesoinComponent } from './components/type-besoin/type-besoin.component';
import { DotationUcaRechComponent } from './components/dotation-uca-rech/dotation-uca-rech.component';

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    LaboratoireComponent,
    MembreComponent,
    ProjetComponent,
    ProjetMembreComponent,
    ExpressionBesoinComponent,
    TypeBesoinComponent,
    DotationUcaRechComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
