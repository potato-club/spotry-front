import { LAYOUT_HIDDEN_PATHS, DYNAMIC_ROUTE_PATTERNS } from './routes';

export const shouldShowLayout = (pathname: string): boolean => {
  if (LAYOUT_HIDDEN_PATHS.includes(pathname as any)) {
    return false;
  }
  
  for (const pattern of DYNAMIC_ROUTE_PATTERNS) {
    if (pathname.startsWith(pattern)) {
      return false;
    }
  }
  
  return true;
};


export const routeUtils = {

  fillParams: (route: string, params: Record<string, string | number>): string => {
    let filledRoute = route;
    Object.entries(params).forEach(([key, value]) => {
      filledRoute = filledRoute.replace(`:${key}`, String(value));
    });
    return filledRoute;
  },


  matchesRoute: (currentPath: string, routePattern: string): boolean => {
    const currentSegments = currentPath.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    
    if (currentSegments.length !== patternSegments.length) {
      return false;
    }
    
    return patternSegments.every((segment, index) => {
      if (segment.startsWith(':')) {
        return true; 
      }
      return segment === currentSegments[index];
    });
  },


  extractParams: (currentPath: string, routePattern: string): Record<string, string> => {
    const currentSegments = currentPath.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    const params: Record<string, string> = {};
    
    patternSegments.forEach((segment, index) => {
      if (segment.startsWith(':')) {
        const paramName = segment.slice(1);
        params[paramName] = currentSegments[index];
      }
    });
    
    return params;
  },
};