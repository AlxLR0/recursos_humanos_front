/**
 * CONFIGURACIÓN DE ENTORNO - DESARROLLO
 * 
 * Este archivo se utiliza cuando ejecutas:
 * - npm start (servidor de desarrollo)
 * - ng serve
 * 
 * PROPIEDADES:
 * - production: false → Indica que no es compilación de producción
 * - apiUrl: URL base del API durante desarrollo local
 *   Se apunta a http://127.0.0.1:8080/api (tu máquina local)
 *   
 * CÓMO SE USA:
 * En empleado.service.ts se importa este archivo:
 * import { environment } from '../environments/environment';
 * 
 * Y se construye la URL base:
 * private urlBase = `${environment.apiUrl}/empleados`;
 * 
 * CAMBIOS:
 * Si tu backend local corre en un puerto diferente, modifica apiUrl aquí.
 * Ejemplo: 'http://localhost:3000/api'
 */

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8080/api'
};