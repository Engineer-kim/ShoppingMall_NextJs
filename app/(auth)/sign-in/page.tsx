import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader ,CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import LoginForm from "./login-form";


export const metadata: Metadata = {
  title: "로그인페이지",
};


const SignInPage = () => {
  return <div className="w-full max-w-md mx-auto">
    <Card>
        <CardHeader className="space-y-4">
          <Link href='/' className="flex-center">
            <Image priority={true} src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} />
          </Link>
          <CardTitle className="text-center">로그인</CardTitle>
          <CardDescription className="text-center">로그인 해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm></LoginForm>
        </CardContent>
    </Card>
  </div>
}
 
export default SignInPage;