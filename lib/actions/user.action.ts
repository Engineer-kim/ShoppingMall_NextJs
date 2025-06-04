'use server'

import { signInFormSchema, signUpFormSchema } from '@/lib/validator';
import {signIn , signOut} from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
 
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
    await signOut();
}


//사용자 회원가입 (prevState ==> 폼 제출 결과, 경고 오류 등등)
export async function siginUpUser(prevState: unknown , formData: FormData) {
  try{
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    });

    const noEncryptPassword = user.password

    user.password = hashSync(user.password, 10)

    await prisma.user.create({
      data:{
        name: user.name,
        email: user.email,
        password: user.password
      },
    });
    await signIn('credentials' ,{
        email: user.email,
        password: noEncryptPassword,
    });
    return { success: true , message: '회원가입 성공했습니다'}
  }
  catch (error){
    if (isRedirectError(error)) {
          throw error;
    }
    return { success: false, message: '회원가입 실패.' };
  }
}