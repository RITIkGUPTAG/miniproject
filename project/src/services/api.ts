const API_URL = 'http://localhost:3000/api';

// Mock database
let users: any[] = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe'
  },
  {
    id: '2',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith'
  }
];

let profiles: any[] = [
  {
    id: '1',
    userId: '1',
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Experienced developer with a passion for building web applications',
    location: 'San Francisco, CA',
    skills: [
      { id: '1', name: 'JavaScript', level: 5 },
      { id: '2', name: 'React', level: 4 },
      { id: '3', name: 'Node.js', level: 4 },
      { id: '4', name: 'TypeScript', level: 3 }
    ],
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    userId: '2',
    name: 'Jane Smith',
    title: 'UX Designer & Frontend Developer',
    bio: 'Creative designer with strong coding skills',
    location: 'New York, NY',
    skills: [
      { id: '5', name: 'UI/UX Design', level: 5 },
      { id: '6', name: 'React', level: 3 },
      { id: '7', name: 'CSS', level: 5 },
      { id: '8', name: 'Figma', level: 4 }
    ],
    github: 'https://github.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith',
    website: 'https://janesmith.design',
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  }
];

// Helper to create JWT token (simplified for demo)
const createToken = (user: any): string => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  return btoa(JSON.stringify(payload));
};

// Helper to verify token
const verifyToken = (token: string) => {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    return null;
  }
};

export const authApi = {
  register: async (credentials: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (users.some(user => user.email === credentials.email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email: credentials.email,
      password: credentials.password,
      name: credentials.name
    };
    
    users.push(newUser);
    
    // Create token
    const token = createToken(newUser);
    
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token
    };
  },
  
  login: async (credentials: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Create token
    const token = createToken(user);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };
  }
};

export const profileApi = {
  getProfiles: async (skill?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (skill) {
      return profiles.filter(profile => 
        profile.skills.some((s: any) => s.name.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    
    return profiles;
  },
  
  getProfileById: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const profile = profiles.find(p => p.id === id);
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    return profile;
  },
  
  createOrUpdateProfile: async (profileData: any, token: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify token
    const userData = verifyToken(token);
    if (!userData) {
      throw new Error('Invalid token');
    }
    
    // Check if profile exists
    const existingProfileIndex = profiles.findIndex(p => p.userId === userData.id);
    
    if (existingProfileIndex >= 0) {
      // Update existing profile
      profiles[existingProfileIndex] = {
        ...profiles[existingProfileIndex],
        ...profileData,
        skills: profileData.skills || profiles[existingProfileIndex].skills
      };
      
      return profiles[existingProfileIndex];
    } else {
      // Create new profile
      const newProfile = {
        id: (profiles.length + 1).toString(),
        userId: userData.id,
        ...profileData
      };
      
      profiles.push(newProfile);
      
      return newProfile;
    }
  },
  
  getUserProfile: async (token: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verify token
    const userData = verifyToken(token);
    if (!userData) {
      throw new Error('Invalid token');
    }
    
    // Find profile
    const profile = profiles.find(p => p.userId === userData.id);
    
    return profile || null;
  }
};