import { Routes } from '@angular/router';
import { ListaComponent } from '../components/empleados/lista/lista.component';
import { AgregarEmpleadoComponent } from '../components/agregar-empleado/agregar-empleado.component';

export const routes: Routes = [
  { 
    path: 'empleados', 
    loadComponent: () => import('../components/empleados/lista/lista.component').then(m => m.ListaComponent)
  },
  { 
    path: 'agregar', 
    loadComponent: () => import('../components/agregar-empleado/agregar-empleado.component').then(m => m.AgregarEmpleadoComponent)
  },
  { 
    path: 'editar-empleado/:id', 
    loadComponent: () => import('../components/editar-empleado/editar-empleado.component').then(m => m.EditarEmpleadoComponent)
  },
  { 
    path: '**', redirectTo: 'empleados', pathMatch: 'full'
  }
];