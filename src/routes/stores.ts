import { writable } from 'svelte/store';
import type { Participant } from './start/types';

export const participantsStore = writable<Participant[]>([]);
export const assignedAdjectivesStore = writable<AssignedAdjectivesMap>({});

type AssignedAdjectivesMap = {
    [id: string]: string[]
}