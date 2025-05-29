import { PrismaClient } from '@prisma/client';
import  sampleData  from './sample-data';


async function main() {
  const  prisma = new PrismaClient();
    // 기존 데이터 삭제
    await prisma.product.deleteMany({});
    //더미 데이터를 DB에 삽입
    await prisma.product.createMany({ data: sampleData.products });
    console.log('데이터 SEED를 통해 생성 성공여:' + sampleData.products.length + '개');
}

main();