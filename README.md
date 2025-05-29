# 사용 기술 스택 및 환경

FrameWork: NextJs(TypeScript)
DB: Prisma(ORM)
DB는 Vercel(무료 호스팅 서비스) 을 통해 클라우드에 올라가있음

# 서버 실행

npm run dev

# DB(테이블) 최초 생성

npx prisma generate

# DB 마이그레이션

npx prisma migrate dev --name (마이그레이션 식별 이름)

# Prsima DB 테이블 정보 및 데이터 확인 (로컬용)

npx prisma studio

# 컬럼명 수정 혹은 테이블 명 수정시

prisma/schem.prisma 에서 필요사항 수정

npx prisma generate > npx prisma migrate dev --name (마이그레이션 식별 이름) > npx prisma studio 에서 변경 사항 확인

# 데이터 삽입시

npx tsx .(데이터밀어넣을 로직이 작성된 파일 경로) ex) npx tsx ./db/seed

# 주의점

1. Prisma에 밀어넣을 데이터 컬럼명과 실 데이터의 이름이 같아야함 아니면 오류남
