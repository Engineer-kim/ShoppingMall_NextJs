import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader ,CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./login-form"
import { auth } from "@/auth";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "로그인페이지",
};

const SignInPage = async (props: {
  searchParams: Promise<{callbackUrl: string}>
}) => {

 const {callbackUrl} = await props.searchParams


  const session = await auth(); //서버 측의 컴포넌트니까 useSession 과 같은 훅을 사용하지않고 미리 정의된 함수 호출함
  if(session){
    return redirect(callbackUrl ||  "/");
  }


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
          <CredentialsSignInForm></CredentialsSignInForm>
        </CardContent>
    </Card>
  </div>
}
 
export default SignInPage;