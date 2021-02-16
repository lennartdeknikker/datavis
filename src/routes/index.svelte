<script>
	import Nav from '../components/Nav.svelte';
	import Visualisation from '../components/Visualisation.svelte'
	import Scale from '../components/scale.svelte';
	import AddButton from '../components/AddButton.svelte';
	import {showModal} from '../stores'
import Modal from '../components/Modal.svelte';
</script>

<style>
	div {
		overflow: hidden;
		max-width: 100vw;
	}
</style>

<svelte:head>
	<title>Fridges around the world</title>
</svelte:head>

<div>
	<Nav />
	<Scale />
	<Visualisation />
	<AddButton />
	{#if $showModal}
		<Modal />
	{/if}
</div>