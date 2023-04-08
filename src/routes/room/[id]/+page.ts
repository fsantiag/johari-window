import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  return {
    id: params.id
  }
  // if (params.id === 'hello-world') {
  //   return {
  //     title: 'Hello world!',
  //     content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
  //   };
  // }
 
  // throw error(404, 'Not found');
}) satisfies PageLoad;