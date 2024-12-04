import Papa from 'papaparse';
import type { Pet } from '../types';

export async function loadPetsFromCSV(): Promise<Pet[]> {
  try {
    const response = await fetch('/src/assets/ChickenSmoothiePetArchive.csv');
    const csvText = await response.text();
    
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });
    
    return data as Pet[];
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
}