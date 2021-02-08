<script>
	import Globe from '../components/Globe.svelte'
	import Uploader from '../components/Uploader.svelte';
</script>

<style>
	div {
		min-width: 500px;
		min-height: 500px;
		width: 100vw;
		height: 500px;
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<div>
	<Uploader />
</div>