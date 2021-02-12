<script>
	import Globe from '../components/Globe.svelte'
import Nav from '../components/Nav.svelte';
</script>

<style>
	.visualisation {
		min-width: 500px;
		min-height: 500px;
		width: 100vw;
		height: calc(100vh - 30px);
	}
</style>

<svelte:head>
	<title>Fridges around the world</title>
</svelte:head>
<Nav />
<div class="visualisation">
	<Globe />
</div>