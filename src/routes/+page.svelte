<script lang="ts">
	import Leaflet from 'components/Leaflet.svelte';
	import Marker from 'components/Marker.svelte';

	import { faStar } from '@fortawesome/free-solid-svg-icons';
	import type { LatLngExpression } from 'leaflet';

	const initialView: LatLngExpression = [40.7026493, -73.991899]; // Dortmund, Germany
	const markerLocations: LatLngExpression[] = [
		[40.703482365922476, -73.9922595930682], // Timeout Market
		[40.702834743794526, -73.98934790024559] // Ecogy
	];
</script>

<div class="h-screen w-full">
	<Leaflet view={initialView} zoom={14}>
		{#each markerLocations as latLng}
			<Marker {latLng} icon={faStar} class=" bg-green-600"></Marker>
		{/each}
	</Leaflet>
</div>
