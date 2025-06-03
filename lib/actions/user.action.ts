'use server'

import { signInFormSchema } from '@/lib/validator';
import {signIn , signOut} from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
 
//사용자 로그인시 호출될 함수
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    await signIn('credentials', user);
    return { success: true, message: '로그인 성공적이요' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: '로그인 실패. 이메일/비밀번호 확인해라' };
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

