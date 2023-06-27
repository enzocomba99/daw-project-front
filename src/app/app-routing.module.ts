import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { EspacioFisicoComponent } from './components/espacio-fisico/espacio-fisico.component';
import { NewEditEspacioFisicoComponent } from './components/espacio-fisico/new-edit-espacio-fisico/new-edit-espacio-fisico.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'espacios', component: EspacioFisicoComponent },
  { path: 'espacios/new', component: NewEditEspacioFisicoComponent },
  { path: 'espacios/edit/:id', component: NewEditEspacioFisicoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
