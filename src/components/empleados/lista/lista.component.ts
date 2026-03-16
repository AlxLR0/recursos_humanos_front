import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Empleado } from '../../../app/models/empleado';
import { EmpleadoServicio } from '../../../servicios/empleado.service';
import { ToastService } from '../../../servicios/toast.service';

/**
 * COMPONENTE LISTA DE EMPLEADOS
 * 
 * Responsabilidades:
 * - Obtener la lista de todos los empleados desde la API
 * - Mostrar los empleados en una tabla HTML
 * - Proporcionar botones para editar y eliminar empleados
 * - Mantener la lista sincronizada cuando se realizan cambios
 * 
 * NOTA TÉCNICA: Usa Angular Signals para asegurar que la UI se actualice correctamente
 * incluso cuando se navega entre rutas y se regresa a este componente.
 */

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent implements OnInit {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Signal que almacena la lista de empleados
  // Se actualiza reactivamente cuando se cargan, editan o eliminan empleados
  empleados = signal<Empleado[]>([]);

  /**
   * MÉTODO: ngOnInit()
   * Se ejecuta cuando el componente se inicializa
   * Carga la lista de empleados desde la API
   */
  ngOnInit() {
    this.cargarEmpleados();
  }

  /**
   * MÉTODO: cargarEmpleados()
   * 
   * Obtiene la lista completa de empleados desde el servidor
   * Llamada GET a /api/empleados
   * 
   * PROCESO:
   * 1. Llama al servicio para obtener empleados
   * 2. La respuesta se almacena en el Signal
   * 3. La tabla HTML se re-renderiza automáticamente con los nuevos datos
   * 4. Si hay error, muestra notificación y registra en consola
   */
  cargarEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (datos) => {
        // La API devolvió la lista, la guardamos en el Signal
        this.empleados.set(datos);
      },
      error: (err) => {
        // Error: La API no respondió correctamente
        this.toastService.showError('Error al cargar los empleados');
        console.error('Error al cargar empleados', err);
      }
    });
  }

  /**
   * MÉTODO: irAEditar(id: number)
   * 
   * Navega a la página de edición del empleado seleccionado
   * Parámetro: id - ID del empleado a editar
   * 
   * RUTA: /editar-empleado/{id}
   * Ejemplo: si id=5, navega a /editar-empleado/5
   */
  irAEditar(id: number) {
    this.router.navigate(['/editar-empleado', id]);
  }

  /**
   * MÉTODO: eliminar(id: number)
   * 
   * Elimina un empleado de la base de datos
   * 
   * PROCESO:
   * 1. Pide confirmación al usuario (para evitar eliminaciones accidentales)
   * 2. Si el usuario cancela, se detiene la ejecución
   * 3. Si confirma, envía DELETE a /api/empleados/{id}
   * 4. En caso de ÉXITO:
   *    - Remueve el empleado del Signal (actualiza la tabla)
   *    - Muestra notificación de éxito
   * 5. En caso de ERROR:
   *    - Muestra notificación de error
   *    - El empleado se mantiene en la lista para que el usuario reintente
   */
  eliminar(id: number) {
    // Confirmación: ¿Está seguro el usuario?
    if (!confirm('¿Estás seguro de eliminar este empleado?')) {
      return;
    }

    // Procede con la eliminación en la API
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => {
        // Éxito: El empleado fue eliminado del servidor
        // Ahora lo eliminamos de la lista en el frontend (Signal)
        // Esto causa que la tabla se re-renderice automáticamente
        this.empleados.update(empleados => empleados.filter(e => e.idEmpleado !== id));
        // Muestra notificación de éxito
        this.toastService.empleadoEliminado();
      },
      error: (err) => {
        // Error: Algo falló en la eliminación (permisos, referencias, etc.)
        this.toastService.showError('Error al eliminar el empleado');
        console.error('Error al eliminar empleado', err);
      }
    });
  }
}
