<script>
	import Nav from '../components/Nav.svelte';
	import Visualisation from '../components/Visualisation.svelte'
	import Scale from '../components/scale.svelte';
	import AddButton from '../components/AddButton.svelte';
	import {showModal} from '../stores'
	import Modal from '../components/Modal.svelte';
  import { categoryColor } from '../stores'
</script>

<style>
	:root {
		--background-color: rgb(66, 66, 66)
	}

	div {
		overflow: hidden;
		max-width: 100vw;
		background-color: var(--background-color);
	}
</style>

<svelte:head>
	<title>Fridges around the world</title>
</svelte:head>

<div style={`--category-color: ${$categoryColor}`}>
	<Nav />
	<Scale />
	<Visualisation />
	<AddButton />
	{#if $showModal}
		<Modal />
	{/if}
</div>