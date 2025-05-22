
import { ROUTES } from './routes';


export type RoutePathType = typeof ROUTES[keyof typeof ROUTES];


export interface RouteParams {
  postId?: string;
  userId?: string;
}


export interface NavigationOptions {
  replace?: boolean;
  state?: any;
}

export interface RouteMetadata {
  title?: string;
  requiresAuth: boolean;
  showLayout: boolean;
  description?: string;
}