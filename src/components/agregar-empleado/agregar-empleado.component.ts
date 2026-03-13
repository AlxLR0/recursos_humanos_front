import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Necesario para el formulario
import { Router } from '@angular/router';
import { Empleado } from '../../app/models/empleado'; // <-- Ruta actualizada
import { EmpleadoServicio } from '../../servicios/empleado.service';

@Component({
  selector: 'app-agregar-empleado',
  standalone: true,
  imports: [FormsModule], // <-- Importante: FormsModule
  templateUrl: './agregar-empleado.component.html'
})
export class AgregarEmpleadoComponent {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);

  // Objeto inicial para el formulario
  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  guardar() {
    this.empleadoService.agregarEmpleado(this.empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']); // Volver a la lista al terminar
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }
}