import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import {NewEtablissementComponent} from "./components/etablissement/new-etablissement/new-etablissement.component";
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { NewLaboratoireComponent } from './components/laboratoire/new-laboratoire/new-laboratoire.component';

const routes: Routes = [
  { path: 'etablissement', component: EtablissementComponent },
  { path: 'addEtablissement', component: NewEtablissementComponent },
  { path: 'laboratoires', component: LaboratoireComponent },
  { path: 'new-laboratoire', component: NewLaboratoireComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
