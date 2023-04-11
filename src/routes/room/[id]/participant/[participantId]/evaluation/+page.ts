import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const response = await fetch(`/api/room/${params.id}/participants/${params.participantId}/evaluation`)
  const { evaluations } = await response.json()
  return {
    id: params.id,
    participantId: params.participantId,
    evaluations
  }
}) satisfies PageLoad;