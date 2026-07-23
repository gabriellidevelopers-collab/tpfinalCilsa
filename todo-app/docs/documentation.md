# Documentacion Tecnica - TaskFlow

## Indice

1. [Introduccion](#1-introduccion)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Componentes del Frontend](#3-componentes-del-frontend)
4. [API Backend](#4-api-backend)
5. [Modelo de Datos](#5-modelo-de-datos)
6. [Guia de Instalacion Detallada](#6-guia-de-instalacion-detallada)
7. [Endpoints de la API](#7-endpoints-de-la-api)
8. [Flujo de Datos](#8-flujo-de-datos)
9. [Seguridad y Validacion](#9-seguridad-y-validacion)
10. [Rendimiento y Optimizaciones](#10-rendimiento-y-optimizaciones)
11. [Solucion de Problemas](#11-solucion-de-problemas)
12. [Proximos Pasos](#12-proximos-pasos)

---

## 1. Introduccion

### 1.1 Proposito del Documento

Esta documentacion tecnica proporciona una vision detallada de la arquitectura, componentes y funcionamiento interno de TaskFlow, una aplicacion web de gestion de tareas desarrollada como Trabajo Final de CILSA.

### 1.2 Alcance

El documento cubre:

- Arquitectura general del sistema
- Implementacion del frontend (HTML, CSS, JavaScript)
- Desarrollo del backend (Node.js, Express.js)
- Integracion con MongoDB
- API RESTful completa
- Consideraciones de seguridad y rendimiento

### 1.3 Publico Objetivo

- Desarrolladores que contribuiran al proyecto
- Evaluadores del Trabajo Final
- Equipo de soporte tecnico

---

## 2. Arquitectura del Sistema

### 2.1 Vision General

TaskFlow sigue una arquitectura de tres capas:

```
┌─────────────────────────────────────────────────┐
│              CAPA DE PRESENTACION               │
│         (Frontend - HTML/CSS/JS)                │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│               CAPA DE LOGICA                    │
│      (Backend - Node.js + Express.js)           │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              CAPA DE DATOS                      │
│           (MongoDB + Mongoose)                  │
└─────────────────────────────────────────────────┘
```

### 2.2 Patron de Diseno

- **Frontend**: SPA (Single Page Application) con rendering dinamico
- **Backend**: API RESTful con patron MVC simplificado
- **Base de Datos**: Document-based storage con MongoDB

### 2.3 Comunicacion entre Componentes

```
Frontend (Browser)
     │
     │ HTTP/HTTPS (JSON)
     │
     ▼
Express.js Server (Puerto 5000)
     │
     │ Mongoose ODM
     │
     ▼
MongoDB (Puerto 27017)
```

---

## 3. Componentes del Frontend

### 3.1 Estructura de Archivos

```
frontend/
├── index.html    # Estructura HTML semantica
├── styles.css    # Hoja de estilos CSS3
└── app.js        # Logica de negocio en JavaScript
```

### 3.2 HTML (index.html)

#### Componentes Principales

1. **Header**: Logo, nombre de la app, estadisticas
2. **Formulario de Tarea**: Campos para crear nuevas tareas
3. **Filtros y Busqueda**: Controles para filtrar tareas
4. **Lista de Tareas**: Contenedor dinamico de tareas
5. **Modal de Edicion**: Formulario para editar tareas
6. **Toast Notificaciones**: Mensajes de feedback

#### Semantica HTML5

- `<header>`: Cabecera de la aplicacion
- `<main>`: Contenido principal
- `<section>`: Secciones logicas
- `<form>`: Formularios con validacion nativa
- `<dialog>` (via div): Modal de edicion

### 3.3 CSS (styles.css)

#### Sistema de Diseno

**Variables CSS (Custom Properties):**

```css
:root {
  /* Colores */
  --ink: #1A1A2E;
  --paper: #F8F9FA;
  --accent: #6C63FF;
  --success: #4ECDC4;
  --danger: #FF6B6B;
  
  /* Tipografia */
  --font-primary: 'Inter', system-ui, sans-serif;
  
  /* Espaciado */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Bordes */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

**Metodologia CSS:**

- BEM-like naming para selectores
- Mobile-first responsive design
- Animaciones con `@keyframes`
- Transiciones suaves en interacciones

#### Paleta de Colores

| Color   | Hex       | Uso                        |
|---------|-----------|----------------------------|
| Ink     | #1A1A2E   | Texto principal            |
| Paper   | #F8F9FA   | Fondo principal            |
| Accent  | #6C63FF   | Botones y acentos          |
| Success | #4ECDC4   | Completadas, exito         |
| Danger  | #FF6B6B   | Eliminar, errores          |
| Muted   | #8B8FA3   | Texto secundario          |

#### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 600px) { ... }

/* Tablet */
@media (min-width: 601px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

### 3.4 JavaScript (app.js)

#### Arquitectura del Codigo

```javascript
// Constantes y configuracion
const API_URL = 'http://localhost:5000/api';

// Elementos del DOM
const taskForm = document.getElementById('task-form');
// ...

// Estado de la aplicacion
let tasks = [];
let currentFilter = 'all';

// Funciones API (CRUD)
async function fetchTasks() { ... }
async function createTask(data) { ... }
async function updateTask(id, data) { ... }
async function deleteTask(id) { ... }

// Funciones de Renderizado
function renderTasks() { ... }
function updateStats() { ... }

// Funciones Auxiliares
function escapeHtml(text) { ... }
function formatDate(date) { ... }

// Event Listeners
taskForm.addEventListener('submit', handleSubmit);
```

#### Flujo de Eventos

```
Usuario interactua
       │
       ▼
Event Listener captura evento
       │
       ▼
Funcion handler procesa
       │
       ▼
Llamada API (fetch)
       │
       ▼
Respuesta del servidor
       │
       ▼
Actualizacion del estado
       │
       ▼
Re-renderizado del DOM
       │
       ▼
Feedback al usuario (toast)
```

---

## 4. API Backend

### 4.1 Servidor Express

**Configuracion del Servidor:**

```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
```

### 4.2 Estructura de Rutas

```
backend/
├── server.js         # Punto de entrada
├── routes/
│   └── tasks.js      # Rutas CRUD
├── models/
│   └── Task.js       # Modelo Mongoose
└── .env              # Variables de entorno
```

### 4.3 Middleware

1. **CORS**: Permite solicitudes desde el frontend
2. **JSON Parser**: Parsea el body de las solicitudes
3. **Error Handler**: Captura y maneja errores

---

## 5. Modelo de Datos

### 5.1 Schema de Tarea

```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true  // createdAt y updatedAt automaticos
});
```

### 5.2 Indices

MongoDB crea automaticamente un indice en `_id`. Para optimizar consultas frecuentes, se podrian agregar:

```javascript
// Indice para buscar por estado
taskSchema.index({ completed: 1 });

// Indice para buscar por prioridad
taskSchema.index({ priority: 1 });

// Indice compuesto
taskSchema.index({ completed: 1, priority: 1 });
```

### 5.3 Documento de Ejemplo

```json
{
  "_id": ObjectId("64f8a1b2c3d4e5f6a7b8c9d0"),
  "title": "Comprar víveres",
  "description": "Leche, huevos, pan, frutas",
  "completed": false,
  "priority": "medium",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z"),
  "__v": 0
}
```

---

## 6. Guia de Instalacion Detallada

### 6.1 Requisitos Previos

| Software | Version Minima | Comando de Verificacion |
|----------|---------------|------------------------|
| Node.js  | 18.0.0        | `node --version`       |
| npm      | 9.0.0         | `npm --version`        |
| MongoDB  | 6.0.0         | `mongod --version`     |

### 6.2 Instalacion de MongoDB

**Windows:**

1. Descargar desde https://www.mongodb.com/try/download/community
2. Ejecutar el instalador
3. Seleccionar "Complete" installation
4. Servicio como Windows Service

**macOS (Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Linux (Ubuntu/Debian):**

```bash
# Importar clave publica
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Agregar repositorio
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 6.3 Configuracion del Backend

1. **Clonar repositorio:**

```bash
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow/backend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crear archivo `.env`:

```env
# Puerto del servidor
PORT=5000

# URI de conexion a MongoDB
MONGODB_URI=mongodb://localhost:27017/taskflow

# Para MongoDB Atlas (opcional):
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/taskflow
```

4. **Iniciar servidor:**

```bash
# Produccion
npm start

# Desarrollo (con auto-reload)
npm run dev
```

### 6.4 Configuracion del Frontend

1. **Servidor estatico (opcional):**

```bash
cd frontend

# Python
python -m http.server 8080

# Node.js
npx serve -l 8080
```

2. **O simplemente abrir `index.html` en el navegador**

### 6.5 Verificacion

1. Visitar `http://localhost:5000/api/health`
2. Deberia retornar: `{"status":"ok","timestamp":"..."}`
3. Abrir `http://localhost:8080` (o el puerto configurado)
4. Crear una tarea de prueba

---

## 7. Endpoints de la API

### 7.1 GET /api/tasks

Obtiene todas las tareas con opciones de filtrado.

**Query Parameters:**

| Parametro  | Tipo   | Descripcion                    | Ejemplo       |
|-----------|--------|--------------------------------|---------------|
| completed | string | Filtrar por estado             | ?completed=true |
| priority  | string | Filtrar por prioridad          | ?priority=high  |

**Ejemplo de Solicitud:**

```bash
curl http://localhost:5000/api/tasks?completed=false&priority=high
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "...",
      "completed": false,
      "priority": "high"
    }
  ],
  "count": 1
}
```

### 7.2 GET /api/tasks/:id

Obtiene una tarea por su ID.

**Ejemplo:**

```bash
curl http://localhost:5000/api/tasks/64f8a1b2c3d4e5f6a7b8c9d0
```

### 7.3 POST /api/tasks

Crea una nueva tarea.

**Body (JSON):**

```json
{
  "title": "Nueva tarea",
  "description": "Descripcion opcional",
  "priority": "medium"
}
```

**Validaciones:**

- `title`: requerido, string, max 100 caracteres
- `description`: opcional, string, max 500 caracteres
- `priority`: opcional, enum ["low", "medium", "high"]

### 7.4 PUT /api/tasks/:id

Actualiza una tarea existente.

**Body (JSON):**

```json
{
  "title": "Titulo actualizado",
  "completed": true
}
```

Solo los campos enviados seran actualizados.

### 7.5 PATCH /api/tasks/:id/toggle

Cambia el estado de completado de una tarea.

**No requiere body.**

### 7.6 DELETE /api/tasks/:id

Elimina una tarea.

**No requiere body.**

---

## 8. Flujo de Datos

### 8.1 Crear Tarea

```
1. Usuario completa formulario
2. Frontend valida datos localmente
3. Frontend envia POST /api/tasks
4. Backend valida con Mongoose
5. MongoDB inserta documento
6. Backend retorna tarea creada
7. Frontend agrega al array local
8. Frontend re-renderiza lista
9. Frontend muestra toast de exito
```

### 8.2 Actualizar Tarea

```
1. Usuario abre modal de edicion
2. Frontend carga datos actuales
3. Usuario modifica campos
4. Frontend envia PUT /api/tasks/:id
5. Backend valida con Mongoose
6. MongoDB actualiza documento
7. Backend retorna tarea actualizada
8. Frontend actualiza array local
9. Frontend cierra modal
10. Frontend re-renderiza lista
```

### 8.3 Eliminar Tarea

```
1. Usuario confirma eliminacion
2. Frontend envia DELETE /api/tasks/:id
3. MongoDB elimina documento
4. Backend retorna confirmacion
5. Frontend remueve del array local
6. Frontend re-renderiza lista
7. Frontend muestra toast de exito
```

---

## 9. Seguridad y Validacion

### 9.1 Validacion del Backend

```javascript
// Mongoose validation
title: {
  required: [true, 'Title is required'],
  maxlength: [100, 'Title cannot exceed 100 characters']
}

// Custom validation en routes
if (!title || title.trim() === '') {
  return res.status(400).json({ error: 'Title is required' });
}
```

### 9.2 Proteccion XSS

```javascript
// Frontend: escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### 9.3 CORS

```javascript
app.use(cors());
// Permite todas las origenes en desarrollo
// En produccion, configurar origenes especificas
```

### 9.4 Headers de Seguridad (Recomendado para Produccion)

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 10. Rendimiento y Optimizaciones

### 10.1 Frontend

- **Debounce en busqueda**: Evitar multiples llamadas API
- **Virtual scrolling**: Para listas grandes (futuro)
- **Lazy loading**: Carga bajo demanda (futuro)

### 10.2 Backend

- **Indices MongoDB**: Para consultas frecuentes
- **Paginacion**: Para listas grandes

```javascript
// Ejemplo de paginacion
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const tasks = await Task.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  res.json(tasks);
});
```

### 10.3 Base de Datos

- **Conexion pooling**: Mongoose maneja esto automaticamente
- **Proyeccion**: Solo campos necesarios

```javascript
const tasks = await Task.find().select('title completed priority');
```

---

## 11. Solucion de Problemas

### 11.1 Errores Comunes

| Error | Causa | Solucion |
|-------|-------|----------|
| ECONNREFUSED | MongoDB no esta corriendo | Iniciar mongod |
| CORS error | Frontend en diferente puerto | Verificar configuracion CORS |
| 404 Not Found | Ruta incorrecta | Verificar URLs de la API |
| 500 Internal Error | Error del servidor | Revisar logs del backend |

### 11.2 Logs

El servidor imprime logs en consola:

```javascript
console.log('Connected to MongoDB');
console.log(`Server running on port ${PORT}`);
console.error('MongoDB connection error:', err);
```

### 11.3 Debugging

**Backend:**

```bash
# Inspeccionar base de datos
mongo
use taskflow
db.tasks.find()
```

**Frontend:**

- Abrir DevTools del navegador (F12)
- Pestaña Network: ver solicitudes HTTP
- Pestaña Console: ver errores y logs

---

## 12. Proximos Pasos

### 12.1 Funcionalidades Futuras

- [ ] Autenticacion de usuarios (JWT)
- [ ] Categorias y etiquetas
- [ ] Fechas de vencimiento
- [ ] Recordatorios y notificaciones
- [ ] Drag & drop para reordenar
- [ ] Exportar a CSV/PDF
- [ ] Modo oscuro

### 12.2 Mejoras Tecnicas

- [ ] Tests unitarios y de integracion
- [ ] CI/CD pipeline
- [ ] Containerizacion con Docker
- [ ] Deploy en la nube (AWS/Heroku)
- [ ] Monitoreo y metricas

### 12.3 Escalabilidad

- [ ] Cache con Redis
- [ ] Balanceo de carga
- [ ] Microservicios
- [ ] GraphQL API

---

## Apendice

### A. Dependencias del Backend

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.6.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### B. Comandos Utiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en produccion
npm start

# Verificar MongoDB
mongosh

# Crear backup
mongodump --db taskflow
```

### C. Recursos

- [Documentacion de Express.js](https://expressjs.com/)
- [Documentacion de Mongoose](https://mongoosejs.com/)
- [Documentacion de MongoDB](https://www.mongodb.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Documento preparado para el Trabajo Final de CILSA**
**Version: 1.0**
**Fecha: Enero 2024**
