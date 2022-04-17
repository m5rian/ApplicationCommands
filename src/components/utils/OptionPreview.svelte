<script>
	export let name
	export let description
	export let icon
	export let colour
</script>

<div class="information">
	<i class="fas {icon}" style="--colour: {colour}"></i>
	<div class="info">
		<input bind:value={name} class="name" style="--colour: {colour}"/>
		<input bind:value={description} class="description" style="--colour: {colour}"/>
	</div>
</div>

<style>
	.information {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	i { color: var(--colour) }
	input { transition: color cubic-bezier(.67, .01, .58, .99) 0.25s }
	.info:hover > input { color: var(--colour) }
</style>