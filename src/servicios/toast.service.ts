import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastContainer: HTMLElement | null = null;

  constructor() {
    this.initializeToastContainer();
  }

  private initializeToastContainer(): void {
    // Crear contenedor de toasts si no existe
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      this.toastContainer.style.zIndex = '9999';
      document.body.appendChild(this.toastContainer);
    }
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    if (!this.toastContainer) return;

    // Crear el toast
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center text-white bg-${type} border-0`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    toastElement.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi ${this.getIconClass(type)} me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    // Agregar al contenedor
    this.toastContainer.appendChild(toastElement);

    // Inicializar y mostrar el toast usando Bootstrap desde window
    const bsToast = new (window as any).bootstrap.Toast(toastElement, {
      autohide: true,
      delay: 3000
    });

    bsToast.show();

    // Remover del DOM después de ocultarse
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  private getIconClass(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  }

  // Métodos públicos para mostrar diferentes tipos de toast
  showSuccess(message: string): void {
    this.showToast(message, 'success');
  }

  showError(message: string): void {
    this.showToast(message, 'error');
  }

  showInfo(message: string): void {
    this.showToast(message, 'info');
  }

  // Métodos específicos para las operaciones del empleado
  empleadoGuardado(): void {
    this.showSuccess('Empleado guardado correctamente');
  }

  empleadoActualizado(): void {
    this.showSuccess('Empleado actualizado correctamente');
  }

  empleadoEliminado(): void {
    this.showSuccess('Empleado eliminado correctamente');
  }
}