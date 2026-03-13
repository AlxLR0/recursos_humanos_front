import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../app/models/empleado';
import { EmpleadoServicio } from '../../servicios/empleado.service';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-empleado.component.html'
})
export class EditarEmpleadoComponent implements OnInit {
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // <-- Para leer el ID de la URL

  id: number = 0;
  empleado: Empleado = { idEmpleado: 0, nombre: '', departamento: '', sueldo: 0 };

  ngOnInit() {
    // 1. Capturamos el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    // 2. Cargamos los datos del empleado
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe({
      next: (datos) => this.empleado = datos,
      error: (err) => console.error('Error al cargar empleado', err)
    });
  }

  actualizar() {
    this.empleadoService.editarEmpleado(this.id, this.empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => console.error('Error al actualizar', err)
    });
  }
}