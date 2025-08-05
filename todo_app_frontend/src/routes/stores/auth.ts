import { writable } from 'svelte/store';

// PUBLIC_INTERFACE
/**
 * The current authenticated user object or null.
 */
export const user = writable<{id: string,email: string}|null>(null);

// PUBLIC_INTERFACE
/**
 * Login with email and password; sets user if successful.
 * Throws error on failure.
 */
export async function login(email: string, password: string) {
  const resp = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
  if (!resp.ok) {
    throw new Error('Invalid credentials');
  }
  const json = await resp.json();
  user.set(json.user);
  localStorage.setItem('currentUser', JSON.stringify(json.user));
}

/**
 * Signup with email+pw, sets user.
 * Throws error on failure.
 */
export async function signup(email: string, password: string) {
  const resp = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
  if (!resp.ok) {
    throw new Error('Signup failed: ' + (await resp.text()));
  }
  const json = await resp.json();
  user.set(json.user);
  localStorage.setItem('currentUser', JSON.stringify(json.user));
}

// PUBLIC_INTERFACE
/** Logout and clear current user */
export function logout() {
  user.set(null);
  localStorage.removeItem('currentUser');
}
