import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EtablissementComponent} from './components/etablissement/etablissement.component';
import {LaboratoireComponent} from './components/laboratoire/laboratoire.component';
import {MembreComponent} from './components/membre/membre.component';
import {ProjetComponent} from "./components/projet/projet.component";
import {ProjetMembreComponent} from "./components/projet-membre/projet-membre.component";

const routes: Routes = [
  {path: 'etablissements', component: EtablissementComponent},
  {path: 'laboratoires', component: LaboratoireComponent},
  {path: 'membres', component: MembreComponent},
  {path: 'projets', component: ProjetComponent},
  {path: 'projetsmembres', component: ProjetMembreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
