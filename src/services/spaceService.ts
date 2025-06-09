
import type { SpaceItem } from '@/types';
import { mockSpacesData } from '@/data/mockData';

// Simulate API call delay
const API_DELAY = 500;

export const getSpaces = async (): Promise<SpaceItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSpacesData]); // Return a copy
    }, API_DELAY);
  });
};

export const getSpaceById = async (id: string): Promise<SpaceItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSpacesData.find(space => space.id === id));
    }, API_DELAY);
  });
};
