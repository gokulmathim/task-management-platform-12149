import { writable } from 'svelte/store';

export const filter = writable<'all'|'active'|'completed'>('all');

// PUBLIC_INTERFACE
export function setFilter(val: 'all'|'active'|'completed') {
  filter.set(val);
}

export const sortBy = writable<string>('dueDateAsc');

// PUBLIC_INTERFACE
export function setSortBy(val: string) {
  sortBy.set(val);
}
