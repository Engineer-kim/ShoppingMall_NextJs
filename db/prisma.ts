import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

//웹 소켓 커낵션 설정(호스팅 서비스인 네온과의 연결) 
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });

const adapter = new PrismaNeon(pool); // PrismaNeon 어댑터를 초기화합니다. 이 어댑터는 Prisma가 Neon 데이터베이스 풀과 상호작용할 수 있도록 해줍니다.

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
