import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Participant } from '../../start/types';


export const load = (async ({ params, fetch }) => {
  const response = await fetch(`/api/room/${params.id}`)
  const { participants }: { participants: Participant[] } = await response.json()
  return {
    id: params.id,
    participants: participants,
    roomId: params.id
  }

}) satisfies PageLoad;