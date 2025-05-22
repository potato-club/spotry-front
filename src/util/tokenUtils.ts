
interface JWTPayload {
  exp: number;
  iat: number;
  sub: string;
}


const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

class TokenManager {
  private token: string | null = null;
  private expirationTimeout: NodeJS.Timeout | null = null;
  private listeners: Set<(isValid: boolean) => void> = new Set();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.token = localStorage.getItem('jwtToken');
    if (this.token && this.isTokenValid()) {
      this.scheduleExpiration();
    } else if (this.token) {
      this.removeToken();
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jwtToken', token);
    this.scheduleExpiration();
    this.notifyListeners(true);
  }
  removeToken() {
    this.token = null;
    localStorage.removeItem('jwtToken');
    this.clearExpirationTimeout();
    this.notifyListeners(false);
  }

  getToken(): string | null {
    return this.token;
  }

  isTokenValid(): boolean {
    if (!this.token) return false;
    
    const decoded = decodeJWT(this.token);
    if (!decoded) return false;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }

  getTimeUntilExpiration(): number {
    if (!this.token) return 0;
    
    const decoded = decodeJWT(this.token);
    if (!decoded) return 0;
    
    const currentTime = Date.now() / 1000;
    return Math.max(0, (decoded.exp - currentTime) * 1000);
  }

  private scheduleExpiration() {
    this.clearExpirationTimeout();
    
    const timeUntilExpiration = this.getTimeUntilExpiration();
    if (timeUntilExpiration > 0) {
      const safetyMargin = 60 * 1000; 
      const timeout = Math.max(0, timeUntilExpiration - safetyMargin);
      
      this.expirationTimeout = setTimeout(() => {
        this.removeToken();
        console.warn('토큰이 만료되었습니다. 다시 로그인해주세요.');
      }, timeout);
    }
  }

  private clearExpirationTimeout() {
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
      this.expirationTimeout = null;
    }
  }

  addListener(callback: (isValid: boolean) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(isValid: boolean) {
    this.listeners.forEach(callback => callback(isValid));
  }
}

export const tokenManager = new TokenManager();

export const getToken = () => tokenManager.getToken();
export const setToken = (token: string) => tokenManager.setToken(token);
export const removeToken = () => tokenManager.removeToken();
export const isTokenValid = () => tokenManager.isTokenValid();
