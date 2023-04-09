import type { PageLoad } from './$types';


export const load = (async ({ params }) => {
  return {
    id: params.id
  }


  // throw error(404, 'Not found');
}) satisfies PageLoad;