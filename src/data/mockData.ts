
import type { MapItem, SpaceItem } from '@/types';

export const mockMapsData: MapItem[] = [
  { id: '1', name: 'Cyber City Neo-Kyoto', description: 'A sprawling futuristic city with neon lights and towering skyscrapers.', imageUrl: 'https://placehold.co/600x400.png', tags: ['sci-fi', 'city', 'cyberpunk'] },
  { id: '2', name: 'Ancient Desert Ruins', description: 'Explore mysterious ruins and hidden treasures in a vast desert.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'desert', 'adventure'] },
  { id: '3', name: 'Floating Sky Islands', description: 'Magical islands floating in the sky, connected by glowing bridges.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'sky', 'magic'] },
  { id: '4', name: 'Underwater Kingdom Atlantis', description: 'Dive deep to discover the legendary underwater city of Atlantis.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'underwater', 'mystery'] },
];

export const mockSpacesData: SpaceItem[] = [
  { id: '1', name: 'Pixel Art Cafe', description: 'A cozy virtual cafe for pixel art enthusiasts to hang out and share creations.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 42, isPublic: true },
  { id: '2', name: 'Developers Den (Private)', description: 'A private workspace for a team of metaverse developers.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 8, isPublic: false },
  { id: '3', name: 'Synthwave Sunset Club', description: 'Dance the night away in a retro-futuristic club with synthwave beats.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 120, isPublic: true },
  { id: '4', name: 'Zen Meditation Garden', description: 'Find your inner peace in this tranquil virtual garden.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 15, isPublic: true },
];
