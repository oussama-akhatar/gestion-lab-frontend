import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { MembreComponent } from './components/membre/membre.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { ProjetMembreComponent } from './components/projet-membre/projet-membre.component';
import { ExpressionBesoinComponent } from './components/expression-besoin/expression-besoin.component';
import { TypeBesoinComponent } from './components/type-besoin/type-besoin.component';
import { DotationUcaRechComponent } from './components/dotation-uca-rech/dotation-uca-rech.component';
import { ProjetComponent } from './components/projet/projet.component';
import { MembreDotationUcaRechComponent } from './components/membre-dotation-uca-rech/membre-dotation-uca-rech.component';

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    LaboratoireComponent,
    MembreComponent,
    ResponsableComponent,
    ProjetComponent,
    ProjetMembreComponent,
    ExpressionBesoinComponent,
    TypeBesoinComponent,
    DotationUcaRechComponent,
    MembreDotationUcaRechComponent
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
