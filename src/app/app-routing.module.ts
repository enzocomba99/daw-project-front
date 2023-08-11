import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { EspacioFisicoComponent } from './components/espacio-fisico/espacio-fisico.component';
import { NewEditEspacioFisicoComponent } from './components/espacio-fisico/new-edit-espacio-fisico/new-edit-espacio-fisico.component';
import { RecursoTecnologicoComponent } from './components/recurso-tecnologico/recurso-tecnologico.component';
import { NewEditRecursoTecnologicoComponent } from './components/recurso-tecnologico/new-edit-recurso-tecnologico/new-edit-recurso-tecnologico.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { NewEditReservaComponent } from './components/reservas/new-edit-reserva/new-edit-reserva.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'espacios', component: EspacioFisicoComponent },
  { path: 'espacios/new', component: NewEditEspacioFisicoComponent },
  { path: 'espacios/edit/:id', component: NewEditEspacioFisicoComponent },
  { path: 'recursos', component: RecursoTecnologicoComponent },
  { path: 'recursos/new', component: NewEditRecursoTecnologicoComponent },
  { path: 'recursos/edit/:id', component: NewEditRecursoTecnologicoComponent },
  { path: 'reservas', component: ReservasComponent},
  { path: 'reservas/new', component: NewEditReservaComponent },
  { path: 'reservas/edit/:id', component: NewEditReservaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
