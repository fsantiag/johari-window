import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const response = await fetch(`/api/room/${params.id}/participants/${params.participantId}/evaluation`)
  return response.json()
}) satisfies PageLoad;