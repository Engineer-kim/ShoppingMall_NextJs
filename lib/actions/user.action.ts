'use server'

import { signInFormSchema, signUpFormSchema } from '@/lib/validator';
import {signIn , signOut} from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { prisma } from '@/db/prisma';
import { hash } from '../encypt';
import { formatError } from '../utils';
 
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

//회원 가입 성공시 반환될 에러 메세지+ 에러 인풋값정보
export type SignUpSuccessState = {
  success: true;
  message: string;
  fieldErrors: { [key: string]: string }; // 성공 시에는 빈 객체
};

// 오류 발생 시 반환될 에러 메세지+ 에러 인풋값정보
export type SignUpErrorState = {
  success: false;
  message: string;
  fieldErrors: { [key: string]: string };
};

export type SiginUpFormState = SignUpSuccessState | SignUpErrorState;

//사용자 회원가입 (prevState ==> 폼 제출 결과, 경고 오류 등등)
export async function siginUpUser(prevState: unknown , formData: FormData) : Promise<SiginUpFormState>{
  try{
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    });

    const noEncryptPassword = user.password

    user.password = await hash(user.password)

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
    return { success: true , message: '회원가입 성공했습니다' , fieldErrors: {}}
  }
  catch (error){
    /**
    console.log(error.name)
    console.log(error.code)
    console.log(error.errors)
    console.log(error.meta?.target)
    */

    if (isRedirectError(error)) {
        throw error;
    }

    const formattedErrorResult = await formatError(error);
     return {
      success: false,
      message: formattedErrorResult.errorMessage,
      fieldErrors: formattedErrorResult.fieldErrors,
    };
  }
}