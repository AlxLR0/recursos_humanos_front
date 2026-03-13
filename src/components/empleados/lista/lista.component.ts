import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Empleado } from '../../../app/models/empleado';
import { EmpleadoServicio } from '../../../servicios/empleado.service';

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

  empleados = signal<Empleado[]>([]);

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (datos) => this.empleados.set(datos),
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }

  irAEditar(id: number) {
    this.router.navigate(['/editar-empleado', id]);
  }

  eliminar(id: number) {
    if (!confirm('¿Estás seguro de eliminar este empleado?')) {
      return;
    }

    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => {
        // Filtrar el eliminado actualizando el signal
        this.empleados.update(empleados => empleados.filter(e => e.idEmpleado !== id));
      },
      error: (err) => console.error('Error al eliminar empleado', err)
    });
  }
}
