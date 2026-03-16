import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empleado } from '../../app/models/empleado';
import { EmpleadoServicio } from '../../servicios/empleado.service';
import { ToastService } from '../../servicios/toast.service';

/**
 * COMPONENTE EDITAR EMPLEADO
 * 
 * Responsabilidades:
 * - Capturar el ID del empleado desde la URL (ejemplo: /editar-empleado/5)
 * - Obtener los datos actuales del empleado desde la API
 * - Renderizar un formulario pre-poblado con esos datos
 * - Enviar los cambios al servidor
 * - Manejar errores en la carga y actualización
 */

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-empleado.component.html'
})
export class EditarEmpleadoComponent implements OnInit {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  // Almacena el ID del empleado que se está editando
  id: number = 0;
  
  // Almacena los datos actuales del empleado (inicialmente vacío)
  empleado: Empleado = { idEmpleado: 0, nombre: '', departamento: '', sueldo: 0 };

  /**
   * MÉTODO: ngOnInit()
   * Se ejecuta automáticamente cuando el componente se inicializa
   * 
   * PROCESO EN DOS PASOS:
   * 1. Lee el ID de la URL usando ActivatedRoute
   * 2. Obtiene los datos del empleado usando ese ID
   */
  ngOnInit() {
    // 1. Capturamos el ID de la URL
    // Ejemplo: si la URL es '/editar-empleado/5', esto extrae el 5
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Cargamos los datos del empleado desde la API
    // Llamada GET a /api/empleados/{id}
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe({
      next: (datos) => {
        // La API retornó los datos del empleado, los asignamos a this.empleado
        // El formulario HTML se actualiza automáticamente con estos valores
        this.empleado = datos;
      },
      error: (err) => {
        // Error al cargar: el empleado no existe, la API está caída, etc.
        this.toastService.showError('Error al cargar los datos del empleado');
        console.error('Error al cargar empleado', err);
      }
    });
  }

  /**
   * MÉTODO: actualizar()
   * 
   * Se ejecuta cuando el usuario hace click en "Actualizar Cambios"
   * 
   * PROCESO:
   * 1. Llama a empleadoService.editarEmpleado(id, empleado modificado)
   * 2. Este método envía un PUT a /api/empleados/{id}
   * 3. En caso de ÉXITO:
   *    - Muestra notificación de actualización
   *    - Redirige a la lista de empleados
   * 4. En caso de ERROR:
   *    - Muestra notificación de error
   *    - El usuario permanece en la página de edición para correguir
   */
  actualizar() {
    this.empleadoService.editarEmpleado(this.id, this.empleado).subscribe({
      next: () => {
        // Éxito: Los cambios fueron guardados en la BD
        this.toastService.empleadoActualizado();
        this.router.navigate(['/empleados']);
      },
      error: (err) => {
        // Error: Falló la actualización (validación, BD, etc.)
        this.toastService.showError('Error al actualizar el empleado');
        console.error('Error al actualizar', err);
      }
    });
  }
}