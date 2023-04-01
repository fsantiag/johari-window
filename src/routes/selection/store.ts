import { writable } from 'svelte/store';

export const selectedAdjectives = writable<string[]>([]);