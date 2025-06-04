import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';


export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 * 60 * 24, // 30일
  },
  //adapter=> 인증 시스템과 데이터베이스를 연결하는 역할
  adapter : PrismaAdapter(prisma),
  providers: [ //로그인 방법
    CredentialsProvider({
      credentials: {
        email: {type: 'email',},
        password: { type: 'password' },
      },
      async authorize(credentials) { //로그인 폼을 통해 자격증명 제출했을때
        if (credentials == null) return null
        const user = await prisma.user.findFirst({  //유저 정보 조회
          where: {
            email: credentials.email as string,
          },
        })
        if (user && user.password) { //해당 유저가 있고 , 해당 유저의 비밀번호가 존재할 때
          const isMatch = compareSync( //암호화된 비밀번호와 입력된 비밀번호를 암호화해서 비교
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        //비밀번호가 일치하지 않거나 유저가 존재하지 않을 때
        console.error('입력한 로그인 정보가 올바르지 않습니다')
        return null
      },
    }),
  ],
  callbacks: {
    //Session 함수는 토큰의 정보를 세션에 담아서 클라이언트 어느곳에서도 쉽게 호출가능(세션 객체 구성)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({session, trigger, token} : any) {
      session.user.id = token.sub //클라이언트 측에서 이 세션이 누구 건지 알기 위함(내부적으로 사용하는 고유 식별자)
      session.user.name = token.name;
      session.user.role = token.role;
      if (trigger === 'update' && token.name) {
        session.user.name = token.name;
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, trigger, session }: any) {
          if (user) {
            token.role = user.role;
            if (user.name === 'NO_NAME') {
              //이름이 없을경우 (구글 로그인과 같은 Oauth 일때는 이름이 없엄) 이메일의 앞자리를 이름을 ex) admin@admin.com => admin 이 이름으로
              token.name = user.email!.split('@')[0];
              await prisma.user.update({
                where: { id: user.id },
                data: { name: token.name },
              });
            }
          }
          if (session?.user.name && trigger === 'update') {
            token.name = session.user.name;
          }
          return token;
        },
      }
} satisfies NextAuthConfig //타입 지정


//handlers: 로그인, 로그아웃, 콜백 URL 처리 등을 담당합니다. Next.js의 API 라우트에서 사용
//auth:  현재 사용자의 인증 상태(세션 정보)를 가져올 수 있는 함수
//signIn: 사용자가 로그인할 때 호출되는 함수
//signOut: 사용자가 로그아웃할 때 호출되는 함수
export const { handlers, auth , signIn , signOut} =  NextAuth(config)