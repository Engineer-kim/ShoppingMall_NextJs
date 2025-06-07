'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerDefaultValues } from '@/lib/constants'
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { siginUpUser } from '@/lib/actions/user.action';
import { useSearchParams } from 'next/navigation';

const RegisterForm = () => {
  const [data, action] = useActionState(siginUpUser, {
    success: false,
    message: '',
    fieldErrors: {}
  });

  // console.log("data::::::" , data)
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';



  const RegisterButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? '회원가입 진행중...' : '회원가입'}
      </Button>
    );
  };
  
  const fieldErrors = data?.fieldErrors || {};
  const errorMessage = data?.message || null;

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>성명</Label>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            defaultValue={registerDefaultValues.name}
          />
          {fieldErrors.name && (
            <p className='text-red-500 text-sm mt-1'>{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor='email'>E-Mail</Label>
          <Input
            id='email'
            name='email'
            type='text'
            autoComplete='email'
            defaultValue={registerDefaultValues.email}
          />
           {fieldErrors.email && (
            <p className='text-red-500 text-sm mt-1'>{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor='password'>패스워드</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={registerDefaultValues.password}
          />
          {fieldErrors.password && (
            <p className='text-red-500 text-sm mt-1'>{fieldErrors.password}</p>
          )}
        </div>
        <div>
          <Label htmlFor='confirmPassword'>패스워드 재확인</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='password'
            defaultValue={registerDefaultValues.confirmPassword}
          />
          {fieldErrors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>{fieldErrors.confirmPassword}</p>
          )}
        </div>
        <div>
          <RegisterButton />
        </div>

        {/* {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )} */}
         {errorMessage && !data.success && !Object.keys(fieldErrors).length && (
          <div className='text-center text-red-500 text-sm mt-2'>{errorMessage}</div>
        )}
        <div className='text-sm text-center text-muted-foreground'>
          이미 계정을 만드셨나요?{' '}
          <Link href='/sign-in' target='_self' className='link text-blue-500'>
            로그인
          </Link>
        </div>
      </div>
    </form>
  );
};


export default RegisterForm;