import { handlers } from '@/auth';
export const { GET, POST } = handlers;
//auth.ts에서 정의된 핸들러(로그인, 로그아웃) 로직 시행==> NextAuth.js 라이브러리가 대신 처리