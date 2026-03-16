import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../app/models/empleado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

/**
 * SERVICIO DE EMPLEADOS - PUNTO CENTRAL DE CONEXIÓN CON LA API
 * 
 * Este servicio actúa como intermediario entre los componentes y la API REST.
 * Todos los métodos retornan Observables para manejar llamadas HTTP asincrónicas.
 * 
 * La URL base se obtiene de los archivos de entorno (environment.ts o environment.prod.ts)
 * para permitir diferentes endpoints en desarrollo y producción.
 * 
 * FLUJO DE DATOS:
 * Componente → llamaAlServicio() → EmpleadoServicio → HttpClient → API REST
 */

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServicio {
  private http = inject(HttpClient);
  
  // URL base construida desde el archivo de ambiente
  // Se concatena '/empleados' para apuntar al endpoint de empleados
  private urlBase = `${environment.apiUrl}/empleados`;

  /**
   * GET /api/empleados
   * Obtiene la lista completa de todos los empleados
   * Retorna: Observable<Empleado[]>
   */
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.urlBase);
  }

  /**
   * GET /api/empleados/{id}
   * Obtiene un empleado específico por su ID
   * Usado cuando se ingresa a la página de edición para cargar los datos actuales
   * Retorna: Observable<Empleado>
   */
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlBase}/${id}`);
  }

  /**
   * POST /api/empleados
   * Crea un nuevo empleado en la base de datos
   * 
   * Nota técnica: Se excluye 'idEmpleado' del payload porque el backend lo genera automáticamente
   * El servidor asignará un ID único en la inserción
   * 
   * Retorna: Observable<Empleado> (con el nuevo ID asignado por el servidor)
   */
  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    const { idEmpleado, ...empleadoSinId } = empleado;
    return this.http.post<Empleado>(this.urlBase, empleadoSinId);
  }

  /**
   * PUT /api/empleados/{id}
   * Actualiza un empleado existente identificado por su ID
   * 
   * Nota técnica: Solo se envían los campos modificables (nombre, departamento, sueldo)
   * El ID no se modifica en el payload para evitar conflictos
   * 
   * Retorna: Observable<Empleado>
   */
  editarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
  // Se crea un objeto con solo los campos permitidos para actualización
  const datosAEnviar = {
    nombre: empleado.nombre,
    departamento: empleado.departamento,
    sueldo: empleado.sueldo
  };

  return this.http.put<Empleado>(`${this.urlBase}/${id}`, datosAEnviar);
}

  /**
   * DELETE /api/empleados/{id}
   * Elimina un empleado de la base de datos por su ID
   * 
   * Nota técnica: Retorna void ya que la eliminación exitosa no devuelve datos
   * El frontend se encarga de remover el registro de la UI
   * 
   * Retorna: Observable<void>
   */
  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}