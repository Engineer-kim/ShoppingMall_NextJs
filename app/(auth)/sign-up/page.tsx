import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader ,CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from './register-form'


export const metadata: Metadata = {
  title: "회원가입페이지",
};

const SignUpPage = async (props: {
  searchParams: Promise<{callbackUrl: string}>
}) => {

 const {callbackUrl} = await props.searchParams


  const session = await auth(); //서버 측의 컴포넌트니까 useSession 과 같은 훅을 사용하지않고 미리 정의된 함수 호출함
  if(session){
    console.log("session", session)
    return redirect(callbackUrl ||  "/");
  }


  return <div className="w-full max-w-md mx-auto">
    <Card>
        <CardHeader className="space-y-4">
          <Link href='/' className="flex-center">
            <Image priority={true} src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} />
          </Link>
          <CardTitle className="text-center">계정 생성</CardTitle>
          <CardDescription className="text-center">회원가입 해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {/*회원가입 폼 자리*/}
            <RegisterForm></RegisterForm>
        </CardContent>
    </Card>
  </div>
}
 
export default SignUpPage;