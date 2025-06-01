'use server'

import { signInFormSchema } from '@/lib/validator';
import {signIn , signOut} from '@/auth';
import {  isRedirectError } from '@/lib/utils';
 
//사용자 로그인시 호출될 함수
export async function signInWithCridentials(prevState: unknown , formData: FormData) {
  try {
    const user = signInFormSchema.parse({ //사용자가 입력하는 데이터 검증
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);
    return { success: true, message: '로그인 성공입니다' };
  } catch (error) {
    if (isRedirectError(error)) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      throw error;
    }
    return { success: false, message: '로그인 실패입니다 입력하신 정보를 확인해주세요.' };
  }
}


//사용자 로그아웃시 호출될 함수
export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: '로그아웃되었습니다' };
  } catch (error) {
    console.error('로그아웃 중 오류가 발생했습니다:', error);
  }
}