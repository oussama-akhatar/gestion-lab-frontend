import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { LaboratoireComponent } from './components/laboratoire/laboratoire.component';
import { MembreComponent } from './components/membre/membre.component';

const routes: Routes = [
  { path: 'etablissements', component: EtablissementComponent },
  { path: 'laboratoires', component: LaboratoireComponent },
  { path: 'membres', component: MembreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
