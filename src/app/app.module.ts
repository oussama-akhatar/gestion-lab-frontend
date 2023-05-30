import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewEtablissementComponent } from './components/etablissement/new-etablissement/new-etablissement.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { NewLaboratoireComponent } from './components/laboratoire/new-laboratoire/new-laboratoire.component';

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    NewEtablissementComponent,
    LaboratoireComponent,
    NewLaboratoireComponent
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
