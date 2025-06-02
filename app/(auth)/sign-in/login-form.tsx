'use client';

import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { logiInDefaultValues } from "@/lib/constants";
import Link from "next/link";

const LoginForm = () => {
  return (
    <form>
      <div className="space-y-6">
      <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              defaultValue={logiInDefaultValues.email}
            />
          </div>
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              required
              autoComplete='password'
              defaultValue={logiInDefaultValues.password}
            />
          </div>
          <div>
            <Button className="w-full" variant="default">
              로그인
            </Button>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              계정이 없으신가요? <Link href="/auth/sign-up" className="text-blue-500 hover:underline">회원가입</Link>
            </p>
          </div>
      </div>
    </form>
  )
}
 
export default LoginForm;