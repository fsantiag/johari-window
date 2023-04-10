import { writable } from 'svelte/store';
import type { AssignedAdjectivesMap, Participant } from './start/types';

export const participantsStore = writable<Participant[]>([]);
export const assignedAdjectivesStore = writable<AssignedAdjectivesMap>({});
