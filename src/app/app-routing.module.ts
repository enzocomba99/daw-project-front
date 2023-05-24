import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EspacioFisicoComponent } from './components/espacio-fisico/espacio-fisico.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'espacios', component: EspacioFisicoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
