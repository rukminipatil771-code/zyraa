import { AuthCredentials, RegisterPayload, User } from '../types';

const SESSION_KEY = 'zyraa_auth_session_v1';
const USERS_KEY = 'zyraa_registered_users_v1';

interface StoredUser extends User {
  passwordHash: string;
}

const DEMO_USER: StoredUser = {
  id: 'usr-demo-01',
  name: 'Aria Sharma',
  email: 'demo@zyraa.com',
  passwordHash: 'zyraa2026',
  createdAt: '2026-09-15T10:00:00.000Z',
};

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    }
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!parsed.some((u) => u.email === DEMO_USER.email)) {
      return [DEMO_USER, ...parsed];
    }
    return parsed;
  } catch {
    return [DEMO_USER];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage errors
  }
}

/**
 * AuthService is structured with async Promises so it can be seamlessly swapped
 * for a REST API, Express endpoint, or Firebase Auth provider in the future.
 */
export const authService = {
  getCurrentSession(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  async login(credentials: AuthCredentials): Promise<User> {
    const email = credentials.email.trim().toLowerCase();
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email);

    if (!found || found.passwordHash !== credentials.password) {
      throw new Error('Invalid email or password. Try demo@zyraa.com / zyraa2026.');
    }

    const sessionUser: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      createdAt: found.createdAt,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const email = payload.email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users.some((u) => u.email.toLowerCase() === email)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      name: payload.name.trim(),
      email,
      passwordHash: payload.password,
      createdAt: new Date().toISOString(),
    };

    saveStoredUsers([...users, newUser]);

    const sessionUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
  },
};
