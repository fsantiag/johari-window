import { writable } from 'svelte/store';
import type { Participant } from './start/types';

export const selectedAdjectivesStore = writable<string[]>([]);
export const participantsStore = writable<Participant[]>([]);