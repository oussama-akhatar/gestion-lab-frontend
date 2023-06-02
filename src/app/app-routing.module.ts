import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import {NewEtablissementComponent} from "./components/etablissement/new-etablissement/new-etablissement.component";
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { NewLaboratoireComponent } from './components/laboratoire/new-laboratoire/new-laboratoire.component';
import { MembreComponent } from './components/membre/membre.component';

const routes: Routes = [
  { path: 'etablissements', component: EtablissementComponent },
  { path: 'new-etablissement', component: NewEtablissementComponent },
  { path: 'laboratoires', component: LaboratoireComponent },
  { path: 'new-laboratoire', component: NewLaboratoireComponent },
  { path: 'membres', component: MembreComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
