<script lang="ts">
  import PetFinder from './lib/components/PetFinder.svelte';
</script>

<main>
  <h1>Identify your December 18th Pets!</h1>
  <PetFinder />
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    background: linear-gradient(45deg, #ff6b81, #ff8fa3);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
    padding-bottom: 0.2rem;
    line-height: 1.3;
  }

  :global(body) {
    background: linear-gradient(135deg, #ffeef2 0%, #ffe4f0 100%);
    margin: 0;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>