# Guia Rapida - TaskFlow

## Inicio Rapido

### 1. Instalar MongoDB

Si aun no tienes MongoDB instalado:

```bash
# Windows: Descargar desde https://www.mongodb.com/try/download/community

# macOS
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongodb
```

### 2. Configurar Backend

```bash
cd todo-app/backend
npm install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
```

### 4. Iniciar Servidor

```bash
# En la carpeta backend/
npm start
```

### 5. Abrir Frontend

```bash
# Opcion 1: Abrir index.html directamente en el navegador

# Opcion 2: Usar servidor local
cd frontend
python -m http.server 8080
# O
npx serve -l 8080
```

### 6. Usar la Aplicacion

1. Visita `http://localhost:8080` (o la ruta donde abriste el HTML)
2. Crea tu primera tarea
3. ¡Disfruta de TaskFlow!

---

## Comandos Utiles

```bash
# Backend
npm start          # Iniciar servidor
npm run dev        # Iniciar en modo desarrollo (con auto-reload)

# Frontend
npx serve frontend # Servidor local para el frontend
```

---

## Solucion de Problemas

### MongoDB no conecta

```bash
# Verificar que MongoDB este corriendo
mongosh --eval "db.runCommand({ping:1})"

# Iniciar MongoDB si esta detenido
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Error CORS

Asegurate de que el frontend y backend esten en puertos diferentes y CORS este configurado.

### Puerto ya en uso

Cambiar el puerto en el archivo `.env`:

```env
PORT=5001
```

---

## Estructura del Proyecto

```
todo-app/
├── backend/
│   ├── models/Task.js      # Modelo de datos
│   ├── routes/tasks.js     # Rutas API
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependencias
│   └── .env                # Configuracion
├── frontend/
│   ├── index.html          # Pagina principal
│   ├── styles.css          # Estilos
│   └── app.js              # Logica del cliente
├── docs/
│   └── documentation.md    # Documentacion tecnica
├── README.md               # Documentacion principal
├── LICENSE                 # Licencia MIT
└── .gitignore              # Archivos ignorados
```

---

## Atajos de Teclado

| Atajo              | Accion                    |
|-------------------|---------------------------|
| `Ctrl/Cmd + N`    | Enfocar campo nueva tarea |
| `Escape`          | Cerrar modal              |

---

## Soporte

Si tienes problemas, revisa:

1. Que MongoDB este corriendo
2. Que el backend este iniciado (puerto 5000)
3. La consola del navegador para errores
4. Los logs en la terminal del backend
