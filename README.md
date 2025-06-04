# 배포 관련 사항

Vercel 통해서 배포를 진행 하였고
React 19를 사용하고 있으나, PayPal 관련 라이브러리와 같은 일부 종속성들이 현재 React 18까지만 지원
이로 인해 종속성 설치 과정에서 충돌이 발생할 수 있음.
이를 해결하기 위해, 필요한 종속성을 설치할 때 --legacy-peer-deps 플래그를 사용하여 peer dependency 충돌을 무시하도록 설정
배포 환경에서는 설치 커맨드 부분에 위에서 발생한 문제로 인해

```
npm install --legacy-peer-deps
```

넣고 배포 진행했음(안하면 종속성 충돌로 배포가 안댐)

# 사용 기술 스택 및 환경

FrameWork: NextJs(TypeScript)
DB: Prisma(ORM)
DB는 Vercel(무료 호스팅 서비스) 을 통해 클라우드에 올라가있음

# 서버 실행

npm run dev

# 데이터 삽입시

npx tsx .(데이터밀어넣을 로직이 작성된 파일 경로) ex) npx tsx ./db/seed

# 주의점

1. Prisma에 밀어넣을 데이터 컬럼명과 실 데이터의 이름이 같아야함 아니면 오류남

# 기타 사항

각 모델(DB 테이블 구조는 AUthJs 에서 거의 참고함)
-AuthJs <br>
https://authjs.dev/getting-started/adapters/prisma
