import type { PageServerLoad } from './$types';

// TODO switch this with a fetch request
import rawInput from '../f.txt?raw';
import parseGoogleResponse from '$lib/parseGoogleResponse';

export const load: PageServerLoad = async (event) => {
	const locations = parseGoogleResponse(rawInput);

	return {
		locations
	};
};
