import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EtablissementComponent} from './components/etablissement/etablissement.component';
import {LaboratoireComponent} from './components/laboratoire/laboratoire.component';
import {MembreComponent} from './components/membre/membre.component';
import {ProjetComponent} from "./components/projet/projet.component";
import {ProjetMembreComponent} from "./components/projet-membre/projet-membre.component";
import {ExpressionBesoinComponent} from "./components/expression-besoin/expression-besoin.component";
import {TypeBesoinComponent} from "./components/type-besoin/type-besoin.component";
import {DotationUcaRechComponent} from "./components/dotation-uca-rech/dotation-uca-rech.component";
import {ResponsableComponent} from './components/responsable/responsable.component';
import {MembreDotationUcaRechComponent} from "./components/membre-dotation-uca-rech/membre-dotation-uca-rech.component";
import {LoginComponent} from "./components/login/login.component";
import {DashborardMembreComponent} from "./components/dashborard-membre/dashborard-membre.component";
import {DashboardResponsableComponent} from "./components/dashboard-responsable/dashboard-responsable.component";

const routes: Routes = [
  {path: '', component: EtablissementComponent},
  {path: 'etablissements', component: EtablissementComponent},
  {path: 'laboratoires', component: LaboratoireComponent},
  {path: 'membres', component: MembreComponent},
  {path: 'responsables', component: ResponsableComponent},
  {path: 'projets', component: ProjetComponent},
  {path: 'projetsmembres', component: ProjetMembreComponent},
  {path: 'expressionbesoin', component: ExpressionBesoinComponent},
  {path: 'typebesoin', component: TypeBesoinComponent},
  {path: 'dotationucarech', component: DotationUcaRechComponent},
  {path: 'membredotationucarech', component: MembreDotationUcaRechComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard-membre', component: DashborardMembreComponent},
  {path: 'dashboard-responsable', component: DashboardResponsableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
