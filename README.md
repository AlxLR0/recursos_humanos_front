# 🚀 Recursos Humanos Frontend

Aplicación web de ejemplo desarrollada con **Angular 19** para gestionar información básica de empleados. Incluye una interfaz moderna con navegación, formularios, y llamadas a una API REST para CRUD de empleados.

---

## 🔍 ¿Qué hace este proyecto?

Este frontend ofrece funcionalidades típicas de un sistema de recursos humanos ligero, como:

- ✅ **Listado de empleados** (con tabla responsive y acciones de edición/eliminación)
- ✍️ **Agregar empleados** mediante formulario validado
- ✏️ **Editar información** de empleados usando rutas parametrizadas
- 🗑️ **Eliminar registros** con confirmación y actualización de lista en tiempo real
- 🔔 **Notificaciones tipo toast** para confirmar acciones (guardado, actualización, eliminación)

El proyecto está pensado para ser un punto de partida limpio y práctico, con buenas prácticas modernas de Angular y experiencia de usuario agradable.

---

## 🧰 Tecnologías y patrones clave

- **Angular 19** (Standalone components, Signals, ChangeDetectionStrategy.OnPush)
- **Bootstrap 5** para estilos, grids, y componentes (navbar, toasts, botones)
- **HttpClient** para consumir una API REST (CRUD)
- **Arquitectura limpia** con servicios y componentes independientes
- **Variables de entorno** para desacoplar la URL del backend y facilitar despliegues

---

## 🗂️ Estructura relevante del proyecto

- `src/app/` → configuración de rutas, componente principal, modelos
- `src/components/` → vistas y formularios (lista, agregar, editar)
- `src/servicios/` → servicios para llamadas HTTP (`empleado.service.ts`) y notificaciones (`toast.service.ts`)
- `src/environments/` → configuración de endpoints para desarrollo y producción

---

## ▶️ Cómo ejecutar el proyecto

1. Instala dependencias:

```bash
npm install
```

2. Configura tu backend local (opcional):

```bash
cp src/environments/environment.example.ts src/environments/environment.local.ts
```

Edita `src/environments/environment.local.ts` y ajusta `apiUrl` a tu API.

3. Inicia el servidor de desarrollo:

```bash
npm start
```

Abre `http://localhost:4200/` en tu navegador.

---

## 🧩 Detalles de implementación importantes

- Los formularios tienen `autocomplete="off"` para evitar sugerencias del navegador.
- El `ToastService` usa toasts nativos de Bootstrap y los muestra en la esquina inferior derecha.
- La lista usa Signals para asegurar que la UI se actualice correctamente al navegar entre rutas.

---

## 🛠️ Compilar para producción

```bash
ng build --configuration production
```

La build se colocará en `dist/` y usará `src/environments/environment.prod.ts`.

---

## 🎯 Personaliza y experimenta

Si quieres extenderlo, algunas ideas son:

- Agregar paginación/búsqueda/ordenamiento en la tabla
- Integrar autenticación (login + token)
- Conectar con una base de datos real en el backend

---

> Nota: Este repositorio no incluye datos sensibles ni credenciales; la conexión al backend se controla desde los archivos de configuración de entorno.
