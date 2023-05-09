import type { Participant } from '../../start/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, url }) => {
  const roomId = url.searchParams.get('roomId')
  const response = await fetch(`/api/room/${roomId}`)
  const { participants }: { participants: Participant[] } = await response.json()

  return {
    participantId: params.id,
    roomId: roomId,
    participants: participants
  }
}) satisfies PageLoad;