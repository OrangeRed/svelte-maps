import type { PageServerLoad } from './$types';

// TODO switch this with a fetch request
import rawInput from '../f.txt?raw';

type Results = {
	name: string | null;
	coords: [number, number] | null;
	address: string | null;
	description: string[] | null;
	metadata: {
		price: string | null;
		rating: number | null;
		reviews: number | null;
	} | null;
};

export const load: PageServerLoad = async (event) => {
	const preparedForParsing = rawInput.replace('/*""*/', '').replace(")]}'\\n", '');
	const d = JSON.parse(preparedForParsing)['d'];
	const data: unknown[][] = JSON.parse(d)[0][1].map((array: unknown[]) => array[14]);

	const locations = data.map((entry, idx) => {
		const name = entry[11] as string | null;
		const address = entry[18] as string | null;
		const description = entry[13] as string[] | null;
		const coords = Array.isArray(entry[9])
			? (entry[9].filter((val): val is number => val) as Results['coords'])
			: null;

		// TODO nesting might be unnecessary ?
		const metadata = Array.isArray(entry[4])
			? {
					price: entry[4][2] as string | null,
					rating: entry[4][7] as number | null,
					reviews: entry[4][8] as number | null
				}
			: null;

		console.log(coords?.join(','));
		return {
			name,
			coords,
			address,
			metadata,
			description
		} satisfies Results;
	});

	return {
		locations
	};
};
