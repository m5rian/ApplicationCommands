<script>
	import router from "page";

	import Login from "./pages/Login.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
	import NotFound from "./pages/NotFound.svelte";

	let page;
	let params;

	router("/", () => (page = Dashboard));
	router("/login", () => (page = Login));
	router("/*", () => (page = NotFound));

	router.start();
</script>

<svelte:component this={page} />
