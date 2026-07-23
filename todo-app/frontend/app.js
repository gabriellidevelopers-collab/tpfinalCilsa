// ============================================
// TaskFlow - Frontend Application Logic
// ============================================

const API_URL = 'http://localhost:5000/api';

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskPriority = document.getElementById('task-priority');
const tasksContainer = document.getElementById('tasks-container');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editTaskId = document.getElementById('edit-task-id');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const editPriority = document.getElementById('edit-priority');
const closeModalBtn = document.getElementById('close-modal');
const cancelEditBtn = document.getElementById('cancel-edit');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');

// State
let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

// ============================================
// API Functions
// ============================================

async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Error fetching tasks');
    tasks = await response.json();
    renderTasks();
    updateStats();
  } catch (error) {
    showToast('Error al cargar las tareas', 'error');
    console.error('Fetch tasks error:', error);
  }
}

async function createTask(taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error creating task');
    }
    
    const newTask = await response.json();
    tasks.unshift(newTask);
    renderTasks();
    updateStats();
    showToast('Tarea creada correctamente', 'success');
    return newTask;
  } catch (error) {
    showToast(error.message || 'Error al crear la tarea', 'error');
    console.error('Create task error:', error);
    throw error;
  }
}

async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error updating task');
    }
    
    const updatedTask = await response.json();
    const index = tasks.findIndex(t => t.id == id);
    if (index !== -1) tasks[index] = updatedTask;
    renderTasks();
    updateStats();
    showToast('Tarea actualizada', 'success');
    return updatedTask;
  } catch (error) {
    showToast(error.message || 'Error al actualizar la tarea', 'error');
    console.error('Update task error:', error);
    throw error;
  }
}

async function toggleTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: 'PATCH'
    });
    
    if (!response.ok) throw new Error('Error toggling task');
    
    const updatedTask = await response.json();
    const index = tasks.findIndex(t => t.id == id);
    if (index !== -1) tasks[index] = updatedTask;
    renderTasks();
    updateStats();
    showToast(updatedTask.completed ? 'Tarea completada' : 'Tarea marcada como pendiente', 'success');
    return updatedTask;
  } catch (error) {
    showToast('Error al cambiar estado de la tarea', 'error');
    console.error('Toggle task error:', error);
    throw error;
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Error deleting task');
    
    tasks = tasks.filter(t => t.id != id);
    renderTasks();
    updateStats();
    showToast('Tarea eliminada', 'success');
  } catch (error) {
    showToast('Error al eliminar la tarea', 'error');
    console.error('Delete task error:', error);
    throw error;
  }
}

// ============================================
// Render Functions
// ============================================

function renderTasks() {
  const filteredTasks = getFilteredTasks();
  
  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = '';
    emptyState.classList.add('visible');
    return;
  }
  
  emptyState.classList.remove('visible');
  
  tasksContainer.innerHTML = filteredTasks.map((task, index) => `
    <div class="task-card ${task.completed ? 'completed' : ''}" style="animation-delay: ${index * 0.05}s">
      <div class="task-header">
        <div class="task-checkbox" onclick="toggleTask('${task.id}')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="task-content">
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
          <div class="task-meta">
            <span class="task-priority ${task.priority}">${getPriorityLabel(task.priority)}</span>
            <span class="task-date">${formatDate(task.created_at)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn edit" onclick="openEditModal('${task.id}')" title="Editar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L15 7L7 15H3V11L11 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="action-btn delete" onclick="confirmDelete('${task.id}')" title="Eliminar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5H15M7 5V3H11V5M6 5V15H12V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getFilteredTasks() {
  return tasks.filter(task => {
    const isCompleted = task.completed === 1 || task.completed === true;
    
    if (currentFilter === 'pending' && isCompleted) return false;
    if (currentFilter === 'completed' && !isCompleted) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(query);
      const descMatch = task.description?.toLowerCase().includes(query);
      if (!titleMatch && !descMatch) return false;
    }
    
    return true;
  });
}

function updateStats() {
  const pending = tasks.filter(t => t.completed === 0 || t.completed === false).length;
  const completed = tasks.filter(t => t.completed === 1 || t.completed === true).length;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

// ============================================
// Helper Functions
// ============================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPriorityLabel(priority) {
  const labels = {
    high: 'Alta',
    medium: 'Media',
    low: 'Baja'
  };
  return labels[priority] || priority;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'Z');
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'Ahora mismo';
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000);
    return `Hace ${mins} min`;
  }
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `Hace ${hours}h`;
  }
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `Hace ${days}d`;
  }
  
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });
}

function showToast(message, type = 'success') {
  const iconMap = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning'
  };
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: iconMap[type] || 'info',
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
}

// ============================================
// Modal Functions
// ============================================

function openEditModal(taskId) {
  const task = tasks.find(t => t.id == taskId);
  if (!task) return;
  
  editTaskId.value = taskId;
  editTitle.value = task.title;
  editDescription.value = task.description || '';
  editPriority.value = task.priority;
  
  editModal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  editModal.classList.remove('visible');
  document.body.style.overflow = '';
  editForm.reset();
}

function confirmDelete(taskId) {
  Swal.fire({
    title: 'Eliminar tarea',
    text: 'No podras revertir esta accion',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#6c63ff',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTask(taskId);
      Swal.fire({
        title: 'Eliminada',
        text: 'La tarea fue eliminada',
        icon: 'success',
        confirmButtonColor: '#6c63ff'
      });
    }
  });
}

// ============================================
// Event Listeners
// ============================================

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const taskData = {
    title: taskTitle.value.trim(),
    description: taskDescription.value.trim(),
    priority: taskPriority.value
  };
  
  if (!taskData.title) {
    showToast('Por favor ingresa un titulo', 'error');
    return;
  }
  
  try {
    await createTask(taskData);
    taskForm.reset();
  } catch (error) {
    // Error already handled
  }
});

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const taskId = editTaskId.value;
  const taskData = {
    title: editTitle.value.trim(),
    description: editDescription.value.trim(),
    priority: editPriority.value
  };
  
  if (!taskData.title) {
    showToast('Por favor ingresa un titulo', 'error');
    return;
  }
  
  try {
    await updateTask(taskId, taskData);
    closeEditModal();
  } catch (error) {
    // Error already handled
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderTasks();
});

closeModalBtn.addEventListener('click', closeEditModal);
cancelEditBtn.addEventListener('click', closeEditModal);
editModal.querySelector('.modal-overlay').addEventListener('click', closeEditModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && editModal.classList.contains('visible')) {
    closeEditModal();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    taskTitle.focus();
  }
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
});
