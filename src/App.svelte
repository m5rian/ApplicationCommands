<script>
	import router from "page";

	import Home from "./pages/Home.svelte";
	import Login from "./pages/Login.svelte";
	import NotFound from "./pages/NotFound.svelte";

	let page;
	let params;

	router("/", () => (page = Home));
	router("/login", () => (page = Login));
	router("/*", () => (page = NotFound));

	router.start();
</script>

<svelte:component this={page} />
