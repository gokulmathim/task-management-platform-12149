import { writable, get } from 'svelte/store';
import { user } from './auth';

export type Task = {
  id: string|number;
  description: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
};

// All tasks loaded for this user
export const tasks = writable<Task[]>([]);

/** ID of task being edited, or null */
export const taskEdit = writable<Task|null>(null);

// PUBLIC_INTERFACE
export function setTaskEdit(task: Task|null) {
  taskEdit.set(task);
}

/**
 * Loads all tasks for the current user from backend.
 */
export async function loadTasks() {
  const u = get(user);
  if (!u) { tasks.set([]); return; }
  const resp = await fetch('/api/tasks', { headers: { Authorization: u.id }});
  if (!resp.ok) { tasks.set([]); return; }
  const json = await resp.json();
  tasks.set(json.tasks || []);
}

/**
 * Create a new task via backend, then reload.
 * @param {Object} data {description:string, dueDate?:string}
 */
export async function createTask(data: {description:string,dueDate?:string}) {
  const u = get(user);
  if (!u) throw new Error("Not authenticated.");
  const resp = await fetch('/api/tasks', {
    method: 'POST',
    headers: {'Content-Type':'application/json', Authorization: u.id },
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error(await resp.text());
  await loadTasks();
}

/**
 * Update existing task via backend, then reload.
 */
export async function updateTask(task: Task) {
  const u = get(user);
  if (!u) throw new Error("Not authenticated.");
  const resp = await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json', Authorization: u.id },
    body: JSON.stringify(task),
  });
  if (!resp.ok) throw new Error(await resp.text());
  await loadTasks();
}

/**
 * Delete a task; reload list on success.
 */
export async function removeTask(id: string|number) {
  const u = get(user);
  if (!u) throw new Error("Not authenticated.");
  const resp = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: u.id }
  });
  if (!resp.ok) throw new Error(await resp.text());
  await loadTasks();
}

/**
 * Toggle completed status of a task; reload on success.
 */
export async function toggleTaskCompletion(task: Task) {
  await updateTask({ ...task, completed: !task.completed });
}

// React to user changing, reload tasks
user.subscribe(() => { loadTasks(); });
