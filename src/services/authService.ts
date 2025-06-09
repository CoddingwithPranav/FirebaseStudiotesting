
// src/services/authService.ts
import type { User } from '@/types';

// Mock a list of all users in the system
// Moved here as it's primarily used by auth functions in this mock setup
const mockAllUsers: User[] = [
  { id: '1', email: 'user@example.com', nickname: 'MetaUser', avatarUrl: `https://placehold.co/100x100.png?text=M`, role: 'user', friendIds: ['2', '3'] },
  { id: '2', email: 'friend.alpha@example.com', nickname: 'FriendAlpha', avatarUrl: `https://placehold.co/100x100.png?text=F`, role: 'user', friendIds: ['1'] },
  { id: '3', email: 'beta.user@example.com', nickname: 'BetaUser', avatarUrl: `https://placehold.co/100x100.png?text=B`, role: 'user', friendIds: ['1', '4'] },
  { id: '4', email: 'gamma.explorer@example.com', nickname: 'GammaExplorer', avatarUrl: `https://placehold.co/100x100.png?text=G`, role: 'user', friendIds: ['3'] },
  { id: '5', email: 'delta.creator@example.com', nickname: 'DeltaCreator', avatarUrl: `https://placehold.co/100x100.png?text=D`, role: 'user', friendIds: [] },
  { id: 'adminUser', email: 'admin@example.com', nickname: 'AdminBoss', avatarUrl: `https://placehold.co/100x100.png?text=A`, role: 'admin', friendIds: ['1'] },
];


const USER_STORAGE_KEY = 'metaverse-user';
const API_DELAY = 500; // Simulate API call delay

export const loginUser = async (email: string, pass: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let foundUser = mockAllUsers.find(u => u.email === email);
  
  if (!foundUser) {
    // For this mock, if user doesn't exist, we create them.
    // In a real app, you'd likely throw an error or have separate signup.
    // This behavior is retained from the original AuthContext logic.
    foundUser = {
      id: String(Date.now()),
      email,
      nickname: email.split('@')[0] || 'NewUser',
      avatarUrl: `https://placehold.co/100x100.png?text=${(email[0] || 'N').toUpperCase()}`,
      role: email.includes('admin') ? 'admin' : 'user', // Simple role assignment
      friendIds: [],
    };
    // In a real scenario, this new user might be added to a DB. Here, it's ephemeral unless explicitly saved.
    // For mockAllUsers to be updated, it should be handled carefully. For simplicity, new users aren't added to mockAllUsers here.
  } else {
    // Ensure friendIds is initialized
    if (!foundUser.friendIds) {
      foundUser.friendIds = [];
    }
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
  return foundUser;
};

export const signupUser = async (email: string, pass: string, nickname: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  const existingUser = mockAllUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const newUser: User = {
    id: String(Date.now()),
    email,
    nickname,
    avatarUrl: `https://placehold.co/100x100.png?text=${(nickname[0] || 'S').toUpperCase()}`,
    role: 'user',
    friendIds: [],
  };
  
  // In a real app, newUser would be saved to a database.
  // For this mock, we can add them to the mockAllUsers list if desired, but this makes it mutable.
  // For simplicity, we'll just store them in localStorage for the session.
  // mockAllUsers.push(newUser); // Optional: if you want new users to be searchable immediately by others.
  
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logoutUser = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const updateUserProfile = async (currentUser: User, nickname: string, avatarFile?: File): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  let newAvatarUrl = currentUser.avatarUrl;
  if (avatarFile) {
    // Simulate file upload and URL retrieval. In a real app, this would involve uploading to a server/storage.
    // For mock, we use createObjectURL. This URL is temporary and tied to the browser session.
    newAvatarUrl = URL.createObjectURL(avatarFile);
  }

  const updatedUser: User = { ...currentUser, nickname, avatarUrl: newAvatarUrl };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  
  // Update in mockAllUsers as well so other parts of the app reflect the change if they use it
  const userIndex = mockAllUsers.findIndex(u => u.id === currentUser.id);
  if (userIndex > -1) {
    mockAllUsers[userIndex] = updatedUser;
  }
  
  return updatedUser;
};

export const getStoredUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (!parsedUser.friendIds) { // Ensure friendIds exists
        parsedUser.friendIds = [];
      }
      return parsedUser;
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  return null;
};

// Expose mockAllUsers for friend search functionality within AuthContext
// This simulates an API endpoint that might return all searchable users.
export const getAllSearchableUsers = async (currentUserId?: string): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  if (!currentUserId) {
    return mockAllUsers.filter(u => u.id !== 'adminUser' && u.role !== 'admin'); // Exclude admin from general search if no user context
  }
  return mockAllUsers.filter(u => u.id !== currentUserId);
};

export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, API_DELAY / 2));
  return mockAllUsers.filter(u => ids.includes(u.id));
};
