export function updateImageBackground(imageUrl: string, bgColor: string): string {
  try {
    const url = new URL(imageUrl);
    url.searchParams.set('bg', bgColor.replace('#', ''));
    return url.toString();
  } catch {
    return imageUrl;
  }
}