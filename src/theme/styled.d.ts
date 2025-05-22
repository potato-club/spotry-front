import 'styled-components';
import { Theme } from './index';

// styled-components의 DefaultTheme을 우리 테마로 확장
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
