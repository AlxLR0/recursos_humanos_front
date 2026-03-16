import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Necesario para el formulario
import { Router, RouterLink } from '@angular/router';
import { Empleado } from '../../app/models/empleado'; // <-- Ruta actualizada
import { EmpleadoServicio } from '../../servicios/empleado.service';
import { ToastService } from '../../servicios/toast.service';

/**
 * COMPONENTE AGREGAR EMPLEADO
 * 
 * Responsabilidades:
 * - Renderizar un formulario para crear nuevos empleados
 * - Capturar los datos ingresados por el usuario
 * - Enviar los datos al servicio para persistencia en la BD
 * - Manejar respuestas exitosas y errores de la API
 */

@Component({
  selector: 'app-agregar-empleado',
  standalone: true,
  imports: [FormsModule, RouterLink], // <-- Importante: FormsModule
  templateUrl: './agregar-empleado.component.html'
})
export class AgregarEmpleadoComponent {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Objeto inicial para el formulario (se vincula con [(ngModel)] en el HTML)
  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  /**
   * MÉTODO: guardar()
   * 
   * Se ejecuta cuando el usuario hace click en "Guardar Empleado"
   * 
   * PROCESO:
   * 1. Llama a empleadoService.agregarEmpleado(this.empleado)
   * 2. Se subscribe al Observable retornado
   * 3. En caso de ÉXITO (next):
   *    - Muestra notificación toast
   *    - Redirige a la página de lista de empleados
   * 4. En caso de ERROR:
   *    - Muestra notificación de error
   *    - Registra el error en consola para debugging
   */
  guardar() {
    this.empleadoService.agregarEmpleado(this.empleado).subscribe({
      next: () => {
        // Éxito: La API retornó 200 OK y creó el empleado
        this.toastService.empleadoGuardado();
        // Navega de vuelta a la lista después de 3 segundos (duración del toast)
        this.router.navigate(['/empleados']); // Volver a la lista al terminar
      },
      error: (err) => {
        // Error: Algo falló en la llamada a la API (4xx, 5xx, timeout, red error)
        this.toastService.showError('Error al guardar el empleado');
        console.error('Error al guardar:', err);
      }
    });
  }
}