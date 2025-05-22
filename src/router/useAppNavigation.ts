import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';
import { routeUtils } from './layoutUtils';

/**
 * 타입 안전한 네비게이션 훅
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    // 기본 네비게이션
    goTo: (path: string) => navigate(path),
    goBack: () => navigate(-1),
    replace: (path: string) => navigate(path, { replace: true }),

    // 타입 안전한 라우트 네비게이션
    routes: {
      splash: () => navigate(ROUTES.SPLASH),
      login: () => navigate(ROUTES.LOGIN),
      signup: () => navigate(ROUTES.SIGNUP),
      main: () => navigate(ROUTES.MAIN),
      location: () => navigate(ROUTES.LOCATION),
      search: () => navigate(ROUTES.SEARCH),
      write: () => navigate(ROUTES.WRITE),
      crew: () => navigate(ROUTES.CREW),
      post: () => navigate(ROUTES.POST),
      myPage: () => navigate(ROUTES.MY_PAGE),
      searchResult: () => navigate(ROUTES.SEARCH_RESULT),
      
      // 매개변수가 있는 라우트
      eachPost: (postId: string | number) => 
        navigate(routeUtils.fillParams(ROUTES.EACH_POST, { postId })),
      findResult: (userId: string | number) => 
        navigate(routeUtils.fillParams(ROUTES.FIND_RESULT, { userId })),
      
      // 인증 관련
      findIdPw: () => navigate(ROUTES.FIND_ID_PW),
      verifyUser: () => navigate(ROUTES.VERIFY_USER),
      resetSuccess: () => navigate(ROUTES.RESET_SUCCESS),
    },
  };
};