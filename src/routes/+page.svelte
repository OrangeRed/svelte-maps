<script lang="ts">
	import Leaflet from 'components/Leaflet.svelte';
	import Marker from 'components/Marker.svelte';

	export let data;
	const { locations } = data;

	import { faFlag } from '@fortawesome/free-solid-svg-icons';
	import { type LatLngExpression } from 'leaflet';

	const initialView: LatLngExpression = [40.7026493, -73.991899]; // Dumbo
	const markerLocations: LatLngExpression[] = [
		[40.703482365922476, -73.9922595930682], // Timeout Market
		[40.702834743794526, -73.98934790024559] // Ecogy
	];
</script>

<div class="h-screen w-full">
	<Leaflet view={initialView} zoom={12}>
		{#each locations as { address, coords }}
			{#if coords}
				<Marker latLng={coords} class="bg-green-600" query={address ?? coords.join(',')}>
					<i class="{faFlag.prefix} fa-{faFlag.iconName} text-white" />
				</Marker>
			{/if}
		{/each}
	</Leaflet>
</div>
