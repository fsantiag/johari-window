import { writable } from 'svelte/store';
import type { AssignedAdjectivesMap, Participant } from './start/types';

export const participantsStore = writable<Participant[]>([]);
export const roomStore = writable<string>();
export const assignedAdjectivesStore = writable<AssignedAdjectivesMap>({});
