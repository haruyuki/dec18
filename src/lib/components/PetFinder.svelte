<script lang="ts">
  import { onMount } from 'svelte';
  import { extractPetKey } from '../utils/urlParser';
  import { loadPetsFromCSV } from '../services/csvService';
  import PetImage from './PetImage.svelte';
  import type { Pet } from '../types';

  let inputUrl = '';
  let foundPet: Pet | null = null;
  let error = '';
  let pets: Pet[] = [];
  let loading = true;
  let hasSearched = false;

  onMount(async () => {
    pets = await loadPetsFromCSV();
    loading = false;
  });

  function findPet() {
    error = '';
    foundPet = null;
    hasSearched = true;
    
    const petKey = extractPetKey(inputUrl);
    if (!petKey) {
      error = 'Invalid URL format. Please check the URL and try again.';
      return;
    }

    const pet = pets.find(p => p.petID === petKey);
    if (pet) {
      foundPet = { ...pet, imageUrl: inputUrl };
    } else {
      error = 'Pet not found in the database.';
    }
  }
</script>

<div class="pet-finder">
  <div class="input-section">
    <div class="input-container">
      <input
        type="text"
        bind:value={inputUrl}
        placeholder="Paste your pet link here"
        class="url-input"
        disabled={loading}
      />
      <button on:click={findPet} class="search-button" disabled={loading}>
        {loading ? 'Loading...' : 'Find Pet'}
      </button>
    </div>
    {#if !hasSearched}
        <div class="url-format-container">
          <div class="url-format-info">
            <div class="url-format-header">Accepted URL formats:</div>
            <ul>
              <li>https://static.chickensmoothie.com/archive/image.php?k=XXXXX&bg=XXXXX</li>
              <li>https://static.chickensmoothie.com/pic.php?k=XXXXX&bg=XXXXX</li>
            </ul>
          </div>
        </div>
      {/if}
  </div>

  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}

  {#if foundPet}
    <div class="pet-result">
      <div class="pet-details">
        <h2>Pet Details</h2>
        <div class="detail-row">
          <span class="label">Year:</span>
          <span class="value">{foundPet.petYear}</span>
        </div>
        <div class="detail-row">
          <span class="label">Event:</span>
          <span class="value">{foundPet.petEvent}</span>
        </div>
        <div class="detail-row archive-link">
          <a href={foundPet.petLink} target="_blank" rel="noopener noreferrer">View pet in Archive</a>
        </div>
      </div>
      <div class="pet-image-section">
        <PetImage imageUrl={foundPet.imageUrl} bgColor="#fff5f8" />
      </div>
    </div>
  {/if}
</div>

<style>
  .pet-finder {
    max-width: 800px;
    margin: 2rem auto;
    background: linear-gradient(135deg, #fff5f8 0%, #ffe4f0 100%);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(255, 107, 129, 0.1);
  }

  .input-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .url-input {
    width: 70%;
    padding: 0.75rem;
    border: 2px solid rgba(255, 202, 212, 0.5);
    border-radius: 8px;
    font-size: 1rem;
    background: #ffffff;
    color: #333;
    transition: all 0.2s ease;
    margin-bottom: 1rem;
  }

  .url-input::placeholder {
    color: #999;
  }

  .url-input:focus {
    border-color: #ff8fa3;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 143, 163, 0.2);
  }

  .url-format-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .url-format-info {
    margin: 1rem auto;
    font-size: 0.85rem;
    color: #666;
    background: rgba(255, 255, 255, 0.7);
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 202, 212, 0.3);
    text-align: center;
    max-width: 600px;
  }

  .url-format-header {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #555;
  }

  .url-format-info ul {
    margin: 0.5rem 0 0 0;
    padding: 0;
    list-style-type: none;
  }

  .url-format-info li {
    font-family: monospace;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    color: #555;
  }

  .url-format-info li:last-child {
    margin-bottom: 0;
  }

  .search-button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(45deg, #ff8fa3, #ff6b81);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease;
    align-self: center;
  }

  .search-button:hover {
    background: linear-gradient(45deg, #ff7c93, #ff5871);
    transform: translateY(-1px);
  }

  .search-button:disabled {
    background: linear-gradient(45deg, #ffc2cf, #ffb5c2);
    cursor: not-allowed;
    transform: none;
  }

  .error-message {
    color: #d32f2f;
    padding: 1rem;
    background: linear-gradient(to right, #ffe4e6, #ffe0e4);
    border-radius: 8px;
    margin-bottom: 1rem;
    border-left: 4px solid #ff6b6b;
  }

  .pet-result {
    display: flex;
    gap: 2.5rem;
    align-items: flex-start;
  }

  .pet-details {
    flex: 1;
    background: linear-gradient(to bottom right, #ffffff, #fff9fb);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .pet-details h2 {
    margin-top: 0;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    border-bottom: 2px solid rgba(255, 228, 230, 0.5);
    padding-bottom: 0.5rem;
  }

  .detail-row {
    display: flex;
    margin-bottom: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 228, 230, 0.5);
  }

  .detail-row:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: bold;
    width: 120px;
    color: #555;
    margin-right: 1rem;
  }

  .value {
    color: #333;
    flex: 1;
  }

  .archive-link {
    justify-content: center;
    padding-top: 1rem;
  }

  .archive-link a {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .pet-image-section {
    flex-shrink: 0;
  }

  a {
    color: #ff6b81;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.8;
  }
</style>