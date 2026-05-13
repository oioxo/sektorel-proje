import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { OlcumPanelComponent } from './components/olcum-panel/olcum-panel';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { HaritaComponent } from './components/harita/harita';
import { DepolarimComponent } from './components/depolarim/depolarim';

export const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'depolarim', component: DepolarimComponent },
  { path: 'dashboard', component: OlcumPanelComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'harita', component: HaritaComponent }
];