import { writable } from 'svelte/store';
import type { Participant } from './start/types';

export const selectedAdjectives = writable<string[]>([]);
export const participants = writable<Participant[]>([]);