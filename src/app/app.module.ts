import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { MembreComponent } from './components/membre/membre.component';

@NgModule({
  declarations: [
    AppComponent,
    EtablissementComponent,
    LaboratoireComponent,
    MembreComponent
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
