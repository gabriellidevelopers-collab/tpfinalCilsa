Alumno: Gabriel Gabrielli
Correo: gabgabrielligabriel@gmail.com.
# TP Final Cilsa - TaskFlow

Gestor de tareas fullstack con frontend en Vercel y backend en Render.

## Frontend

**URL:** https://frontend-cilsa-tp-final-git-main-gabydevelopers.vercel.app/

### Paginas y Rutas del Frontend

| Ruta | Descripcion |
| ---- | ----------- |
| `/` | Pagina principal con formulario de tareas, filtros y lista |
| `/api/tasks` | Vista de todas las tareas (API) |

### Funcionalidades

- Crear tareas con titulo, descripcion y prioridad
- Editar tareas existentes
- Eliminar tareas con confirmacion (SweetAlert2)
- Marcar tareas como completadas/pendientes
- Filtrar por estado (todas, pendientes, completadas)
- Buscar tareas por titulo o descripcion
- Estadisticas en tiempo real (pendientes/completadas)
- Toasts animados con SweetAlert2

## Backend

**URL:** https://backendfinaltp.onrender.com

### API Endpoints

| Metodo | URL | Descripcion |
| ------ | --- | ----------- |
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `GET` | `/api/tasks/:id` | Obtener tarea por ID |
| `POST` | `/api/tasks` | Crear tarea |
| `PUT` | `/api/tasks/:id` | Actualizar tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea |
| `PATCH` | `/api/tasks/:id/toggle` | Alternar estado completada |
| `GET` | `/api/health` | Health check |

### Ejemplos de Uso

```bash
# Obtener todas las tareas
curl https://backendfinaltp.onrender.com/api/tasks

# Crear tarea
curl -X POST https://backendfinaltp.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudiar para el parcial","description":"Repasar los temas del TP","priority":"high"}'

# Toggle completada
curl -X PATCH https://backendfinaltp.onrender.com/api/tasks/1/toggle

# Eliminar tarea
curl -X DELETE https://backendfinaltp.onrender.com/api/tasks/1
```

## Repositorios

| Componente | Repositorio |
| ---------- | ----------- |
| Frontend | https://github.com/gabriellidevelopers-collab/frontendCilsaTpFinal |
| Backend | https://github.com/gabriellidevelopers-collab/backendFinaltp |
| Completo | https://github.com/gabriellidevelopers-collab/tpfinalCilsa |

## Despliegue

- **Frontend:** Vercel (cuenta de gabriellidevelopers-collab)
- **Backend:** Render (cuenta secundaria)

> **Nota:** El backend se despliego en una cuenta secundaria de Render porque la cuenta principal agoto el plazo del tier gratuito. El correo del alumno responsable del proyecto es gabgabrielligabriel@gmail.com.

## Tecnologias

### Frontend
- HTML5
- CSS3
- JavaScript ES6+ (async/await, Fetch API)
- SweetAlert2

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- CORS
- dotenv
