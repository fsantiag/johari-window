import type { Participant } from '../../start/types';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch, url }) => {
  const roomId = url.searchParams.get('roomId')
  const response = await fetch(`/api/room/${roomId}`)
  const { participants, maxAdjectives }: { participants: Participant[], maxAdjectives: number } = await response.json()

  return {
    participantId: params.id,
    roomId: roomId,
    participants: participants,
    maxAdjectives: maxAdjectives
  }
}) satisfies PageLoad;