<script lang="ts">
  import { updateImageBackground } from '../utils/imageUtils';
  
  export let imageUrl: string;
  export let bgColor: string = '#ffffff';
  
  $: adjustedImageUrl = updateImageBackground(imageUrl, bgColor);
</script>

<div class="pet-image-container">
  <img 
    src={adjustedImageUrl} 
    alt="Pet" 
    class="pet-image"
  />
</div>

<style>
  .pet-image-container {
    width: 200px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .pet-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>