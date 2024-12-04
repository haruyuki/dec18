export function extractPetKey(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('k');
  } catch {
    // If URL is invalid, try to extract k parameter directly
    const match = url.match(/[?&]k=([^&]+)/);
    return match ? match[1] : null;
  }
}