import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../app/models/empleado';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServicio {
  private http = inject(HttpClient);
  private urlBase = `${environment.apiUrl}/empleados`;

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.urlBase);
  }

  // Nuevo: Obtener un solo empleado para cargar el formulario
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlBase}/${id}`);
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    const { idEmpleado, ...empleadoSinId } = empleado;
    return this.http.post<Empleado>(this.urlBase, empleadoSinId);
  }

  // Nuevo: Enviar la actualización
  editarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
  // Extraemos solo lo que el backend espera (quitamos el idEmpleado)
  const datosAEnviar = {
    nombre: empleado.nombre,
    departamento: empleado.departamento,
    sueldo: empleado.sueldo
  };

  return this.http.put<Empleado>(`${this.urlBase}/${id}`, datosAEnviar);
}

  // Eliminar un empleado por su ID
  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}