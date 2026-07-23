# TaskFlow - Gestor de Tareas Moderno

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-v1.0.0-6C63FF?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-v4.18-000000?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-v7+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Una aplicacion web elegante y funcional para gestionar tus tareas diarias**

[Caracteristicas](#caracteristicas) • [Instalacion](#instalacion) • [Uso](#uso) • [API](#api-documentation) • [Tecnologias](#tecnologias)

</div>

---

## Tabla de Contenidos

- [Descripcion del Proyecto](#descripcion-del-proyecto)
- [Caracteristicas](#caracteristicas)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Instalacion](#instalacion)
- [Uso](#uso)
- [API Documentation](#api-documentation)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologias](#tecnologias)
- [Desarrollo](#desarrollo)
- [Licencia](#licencia)

---

## Descripcion del Proyecto

**TaskFlow** es una aplicacion web full-stack diseñada para ayudar a los usuarios a gestionar sus tareas diarias de manera eficiente y visualmente atractiva. El proyecto fue desarrollado como parte del Trabajo Final de CILSA, demostrando la integracion completa entre frontend, backend y base de datos.

### Objetivos del Proyecto

1. Desarrollar una interfaz intuitiva y moderna para la gestion de tareas
2. Implementar una API RESTful completa con operaciones CRUD
3. Integrar una base de datos NoSQL para persistencia de datos
4. Aplicar buenas practicas de desarrollo de software
5. Crear documentacion completa del sistema

---

## Caracteristicas

### Frontend

- **Interfaz Responsive**: Se adapta perfectamente a dispositivos moviles, tablets y escritorio
- **Diseno Moderno**: Gradient colors, sombras suaves, y animaciones elegantes
- **CRUD Completo**: Crear, leer, actualizar y eliminar tareas
- **Filtrado**: Ver todas, pendientes o completadas
- **Busqueda**: Encontrar tareas rapidamente por titulo o descripcion
- **Prioridades**: Tres niveles de prioridad (Alta, Media, Baja) con indicadores de color
- **Estados**: Marcar tareas como completadas con un solo clic
- **Modal de Edicion**: Editar tareas en un formulario emergente
- **Notificaciones Toast**: Feedback visual para cada accion
- **Estadisticas**: Contador en tiempo real de tareas pendientes y completadas

### Backend

- **API RESTful**: Endpoints estandar para todas las operaciones
- **Validacion**: Validacion de datos en el servidor
- **Manejo de Errores**: Respuestas de error consistentes y descriptivas
- **CORS**: Soporte para solicitudes cross-origin
- **MongoDB**: Base de datos NoSQL para almacenamiento flexible

### Base de Datos

- **MongoDB**: Base de datos NoSQL sin esquema estricto
- **Mongoose**: ODM para validacion y modelos de datos
- **Timestamps**: Automaticos para creacion y actualizacion

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTE                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Frontend (HTML/CSS/JS)              │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │   UI    │  │  State  │  │   API Client    │ │   │
│  │  │  Layer  │  │  Mgmt   │  │   (Fetch API)   │ │   │
│  │  └─────────┘  └─────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                           │                             │
│                    HTTP Requests                        │
│                           ▼                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Backend (Node.js + Express)            │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │ Routes  │  │Controllers│ │   Middleware     │ │   │
│  │  │         │  │          │  │  (CORS, JSON)   │ │   │
│  │  └─────────┘  └─────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                           │                             │
│                    Mongoose ODM                          │
│                           ▼                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │              MongoDB Database                    │   │
│  │         ┌─────────────────────────┐             │   │
│  │         │      Tasks Collection    │             │   │
│  │         │  - _id (ObjectId)        │             │   │
│  │         │  - title (String)        │             │   │
│  │         │  - description (String)  │             │   │
│  │         │  - completed (Boolean)   │             │   │
│  │         │  - priority (Enum)       │             │   │
│  │         │  - timestamps            │             │   │
│  │         └─────────────────────────┘             │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Instalacion

### Prerequisitos

- **Node.js** v18 o superior
- **MongoDB** v6 o superior (local o Atlas)
- **npm** o **yarn**

### Pasos de Instalacion

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow
```

2. **Instalar dependencias del Backend**

```bash
cd backend
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
```

> **Nota**: Si usas MongoDB Atlas, reemplaza la URI con tu cadena de conexion.

4. **Iniciar MongoDB**

Si usas MongoDB local:

```bash
# En una nueva terminal
mongod
```

5. **Iniciar el Backend**

```bash
npm start
# O para desarrollo con auto-reload:
npm run dev
```

6. **Abrir el Frontend**

Abre `frontend/index.html` en tu navegador o usa un servidor local:

```bash
# Usando Python
cd frontend
python -m http.server 8080

# Usando Node
npx serve frontend
```

7. **Verificar la conexion**

Visita `http://localhost:5000/api/health` para confirmar que el servidor esta funcionando.

---

## Uso

### Crear una Tarea

1. Escribe el titulo de la tarea en el campo de entrada
2. (Opcional) Agrega una descripcion
3. Selecciona la prioridad (Alta, Media, Baja)
4. Haz clic en "Agregar Tarea"

### Completar una Tarea

- Haz clic en el circulo a la izquierda de la tarea
- La tarea se marcara automaticamente como completada

### Editar una Tarea

1. Haz clic en el icono de lapiz (editar)
2. Modifica los campos que desees
3. Haz clic en "Guardar Cambios"

### Eliminar una Tarea

1. Haz clic en el icono de papelera (eliminar)
2. Confirma la eliminacion en el dialogo

### Buscar Tareas

- Escribe en el campo de busqueda para filtrar por titulo o descripcion

### Filtrar Tareas

- Usa los botones "Todas", "Pendientes" o "Completadas"

### Atajos de Teclado

- `Ctrl/Cmd + N`: Enfocar el campo de nueva tarea
- `Escape`: Cerrar el modal de edicion

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Obtener Todas las Tareas

```http
GET /tasks
```

**Parametros Query (opcionales):**

| Parametro  | Tipo    | Descripcion                    |
|-----------|---------|--------------------------------|
| completed | string  | Filtrar por estado ("true"/"false") |
| priority  | string  | Filtrar por prioridad          |

**Respuesta (200):**

```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Mi tarea",
    "description": "Descripcion de la tarea",
    "completed": false,
    "priority": "medium",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Obtener una Tarea

```http
GET /tasks/:id
```

**Respuesta (200):**

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "Mi tarea",
  "description": "Descripcion de la tarea",
  "completed": false,
  "priority": "medium",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Crear una Tarea

```http
POST /tasks
```

**Body:**

```json
{
  "title": "Nueva tarea",
  "description": "Descripcion opcional",
  "priority": "high"
}
```

**Respuesta (201):**

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "Nueva tarea",
  "description": "Descripcion opcional",
  "completed": false,
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Actualizar una Tarea

```http
PUT /tasks/:id
```

**Body:**

```json
{
  "title": "Tarea actualizada",
  "completed": true
}
```

**Respuesta (200):**

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "Tarea actualizada",
  "description": "Descripcion opcional",
  "completed": true,
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

#### Cambiar Estado de Tarea

```http
PATCH /tasks/:id/toggle
```

**Respuesta (200):**

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "Mi tarea",
  "completed": true,
  ...
}
```

#### Eliminar una Tarea

```http
DELETE /tasks/:id
```

**Respuesta (200):**

```json
{
  "message": "Task deleted successfully"
}
```

### Codigos de Estado

| Codigo | Descripcion            |
|-------|------------------------|
| 200   | Operacion exitosa      |
| 201   | Recurso creado         |
| 400   | Solicitud invalida     |
| 404   | Recurso no encontrado  |
| 500   | Error del servidor     |

---

## Estructura del Proyecto

```
tpfinalCilsa/
└── todo-app/
    ├── backend/
    │   ├── models/
    │   │   └── Task.js          # Modelo de datos
    │   ├── routes/
    │   │   └── tasks.js         # Rutas de la API
    │   ├── .env                 # Variables de entorno
    │   ├── package.json         # Dependencias
    │   └── server.js            # Servidor principal
    ├── frontend/
    │   ├── index.html           # Pagina principal
    │   ├── styles.css           # Estilos
    │   └── app.js               # Logica del cliente
    └── docs/
        └── documentation.md     # Documentacion tecnica
```

---

## Tecnologias

### Frontend

| Tecnologia | Uso                           |
|-----------|-------------------------------|
| HTML5     | Estructura semantica           |
| CSS3      | Estilos y diseno responsive   |
| JavaScript| Logica de la aplicacion        |
| Fetch API | Comunicacion con el backend    |

### Backend

| Tecnologia | Uso                           |
|-----------|-------------------------------|
| Node.js   | Runtime de JavaScript         |
| Express.js| Framework web                 |
| Mongoose  | ODM para MongoDB              |
| CORS      | Cross-Origin Resource Sharing |
| dotenv    | Variables de entorno          |

### Base de Datos

| Tecnologia | Uso                           |
|-----------|-------------------------------|
| MongoDB   | Base de datos NoSQL           |

---

## Desarrollo

### Modelo de Datos

```javascript
// Task Schema
{
  _id: ObjectId,           // Identificador unico
  title: String,           // Titulo (requerido, max 100 chars)
  description: String,     // Descripcion (opcional, max 500 chars)
  completed: Boolean,      // Estado (default: false)
  priority: String,        // "low" | "medium" | "high"
  createdAt: Date,         // Fecha de creacion (automatico)
  updatedAt: Date          // Fecha de actualizacion (automatico)
}
```

### Convenciones de Codigo

- **Nomenclatura**: camelCase para variables y funciones
- **Archivos**: PascalCase para componentes, kebab-case para utilidades
- **CSS**: BEM-like naming para clases
- **Comments**: Solo cuando es necesario para explicar el "por que"

### Git Workflow

```bash
# Crear rama feature
git checkout -b feature/nombre-feature

# Hacer cambios
git add .
git commit -m "feat: descripcion del cambio"

# Push y crear PR
git push origin feature/nombre-feature
```

---

## Contribuir

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/nombre-feature`)
3. Hacer commit de los cambios (`git commit -m 'feat: agregar nueva caracteristica'`)
4. Push a la rama (`git push origin feature/nombre-feature`)
5. Abrir un Pull Request

---

## Licencia

Este proyecto esta bajo la Licencia MIT. Ver el archivo `LICENSE` para mas detalles.

---

## Autores

**Equipo de Desarrollo - CILSA**

- Desarrollador Frontend
- Desarrollador Backend
- Designer UI/UX

---

<div align="center">

Hecho con dedicacion para el Trabajo Final de CILSA

</div>
