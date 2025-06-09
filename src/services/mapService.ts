
import type { MapItem } from '@/types';
import { mockMapsData } from '@/data/mockData';

// Simulate API call delay
const API_DELAY = 500;

export const getMaps = async (): Promise<MapItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockMapsData]); // Return a copy to prevent direct modification
    }, API_DELAY);
  });
};

export const getMapById = async (id: string): Promise<MapItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMapsData.find(map => map.id === id));
    }, API_DELAY);
  });
};
