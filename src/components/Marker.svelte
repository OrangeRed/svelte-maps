<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { cn } from '$lib/utils';
	import L from 'leaflet';

	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

	export let latLng: L.LatLngExpression;
	export let icon: IconDefinition;

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	setContext('layer', {
		// L.Marker inherits from L.Layer
		getLayer: () => marker
	});

	onMount(() => {
		if (map) {
			marker = L.marker(latLng, {
				icon: L.divIcon({
					className: 'map-marker',
					html: markerElement,
					iconSize: L.point(24, 24),
					popupAnchor: L.point(0, -12)
				})
			}).addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<a
	bind:this={markerElement}
	class={cn(
		'flex h-full w-full items-center justify-center rounded-full border-2 p-3 shadow-sm shadow-black',
		$$restProps.class || ''
	)}
	href="https://maps.app.goo.gl/5YDcALRt1MRFewjUA"
	target="_blank"
>
	{#if marker}
		<i class={cn('text-white', `${icon.prefix} fa-${icon.iconName}`)} />
		<slot />
	{/if}
</a>
