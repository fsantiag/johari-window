import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load = (async ({ params, fetch }) => {
  const response = await fetch(`/api/room/${params.id}`)
  const { participants } = await response.json()
  return {
    id: params.id,
    participants: participants
  }


  // throw error(404, 'Not found');
}) satisfies PageLoad;