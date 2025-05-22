// 기존 인터페이스 호환성을 위해 tokenUtils로 위임
import { getToken as _getToken, setToken as _setToken, removeToken as _removeToken } from './tokenUtils';

export const getToken = _getToken;
export const setToken = _setToken;
export const removeToken = _removeToken;

// @deprecated - tokenUtils.ts의 tokenManager를 직접 사용하는 것을 권장
// 마이그레이션 후 이 파일은 제거 예정