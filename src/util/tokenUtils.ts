// JWT 토큰 관리를 위한 향상된 유틸리티

interface JWTPayload {
  exp: number;
  iat: number;
  sub: string;
}

// JWT 토큰 디코딩 함수 (외부 라이브러리 없이)
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

// 토큰 상태를 전역으로 관리하는 클래스
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
      // 토큰이 있지만 만료된 경우 제거
      this.removeToken();
    }
  }

  // 토큰 설정 및 만료 시간 스케줄링
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jwtToken', token);
    this.scheduleExpiration();
    this.notifyListeners(true);
  }

  // 토큰 제거
  removeToken() {
    this.token = null;
    localStorage.removeItem('jwtToken');
    this.clearExpirationTimeout();
    this.notifyListeners(false);
  }

  // 현재 토큰 반환
  getToken(): string | null {
    return this.token;
  }

  // 토큰 유효성 검사 (동기)
  isTokenValid(): boolean {
    if (!this.token) return false;
    
    const decoded = decodeJWT(this.token);
    if (!decoded) return false;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }

  // 토큰 만료까지 남은 시간 (밀리초)
  getTimeUntilExpiration(): number {
    if (!this.token) return 0;
    
    const decoded = decodeJWT(this.token);
    if (!decoded) return 0;
    
    const currentTime = Date.now() / 1000;
    return Math.max(0, (decoded.exp - currentTime) * 1000);
  }

  // 만료 시간에 자동으로 토큰 제거하도록 스케줄링
  private scheduleExpiration() {
    this.clearExpirationTimeout();
    
    const timeUntilExpiration = this.getTimeUntilExpiration();
    if (timeUntilExpiration > 0) {
      // 실제 만료 시간보다 1분 일찍 제거 (안전 마진)
      const safetyMargin = 60 * 1000; // 1분
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

  // 토큰 상태 변경 리스너 등록
  addListener(callback: (isValid: boolean) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(isValid: boolean) {
    this.listeners.forEach(callback => callback(isValid));
  }
}

// 싱글톤 인스턴스
export const tokenManager = new TokenManager();

// 기존 인터페이스 호환성을 위한 함수들
export const getToken = () => tokenManager.getToken();
export const setToken = (token: string) => tokenManager.setToken(token);
export const removeToken = () => tokenManager.removeToken();
export const isTokenValid = () => tokenManager.isTokenValid();
