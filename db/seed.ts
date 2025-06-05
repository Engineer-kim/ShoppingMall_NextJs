import { PrismaClient } from '@prisma/client';
import  sampleData  from './sample-data';
import { hash } from '@/lib/encypt'

async function main() {
  const  prisma = new PrismaClient();
    // 기존 데이터 삭제
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.verificationToken.deleteMany({});
    //더미 데이터를 DB에 삽입
    await prisma.product.createMany({ data: sampleData.products });


    /**
     * 20250605 Update
     * 기본 데이터 인서트시 평문으로 인서트하고
     * 넣을떄 데이터중 패스워드만 암호화해서 인서트 하는식으로 변경
    */
    const users= []
    for (let i=0; i<sampleData.users.length; i++) {
      users.push({
        ...sampleData.users[i],
        password: await hash(sampleData.users[i].password),
      });
    }

    await prisma.user.createMany({ data: users });

    console.log('데이터 SEED를 통해 생성 성공여:' + sampleData.products.length + '개(상품)');
    console.log('데이터 SEED를 통해 생성 성공여:' + sampleData.users.length + '개(유저)');
}

main();