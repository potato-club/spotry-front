import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';
import { routeUtils } from './layoutUtils';


export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goTo: (path: string) => navigate(path),
    goBack: () => navigate(-1),
    replace: (path: string) => navigate(path, { replace: true }),

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
      
      eachPost: (postId: string | number) => 
        navigate(routeUtils.fillParams(ROUTES.EACH_POST, { postId })),
      findResult: (userId: string | number) => 
        navigate(routeUtils.fillParams(ROUTES.FIND_RESULT, { userId })),
      
      findIdPw: () => navigate(ROUTES.FIND_ID_PW),
      verifyUser: () => navigate(ROUTES.VERIFY_USER),
      resetSuccess: () => navigate(ROUTES.RESET_SUCCESS),
    },
  };
};