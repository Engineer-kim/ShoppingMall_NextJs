const encoder = new TextEncoder();
const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY);

if (!key) {
  console.log("------key------::" , key)
  throw new Error('ENCRYPTION_KEY 환경변수가 설정되어 있지 않습니다.');
}

//입력된 비밀번호(plain text)를 암호화하여 해시 값을 반환
export const hash = async (plainPassword: string): Promise<string> => {
  const passwordData = encoder.encode(plainPassword);

  const cryptoKey = await crypto.subtle.importKey(
    'raw', 
    key,  // 비밀 키 (바이트 배열)
    { name: 'HMAC', 
      hash: { name: 'SHA-256' } // HMAC + SHA-256 알고리즘
    },
    false, 
    ['sign', 'verify'] // 서명 및 검증 용도
  );

  const hashBuffer = await crypto.subtle.sign('HMAC', cryptoKey, passwordData);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16) //숫자를 16진수 문자열로 변환
    .padStart(2, '0')) //	한 자리일 경우 앞에 0을 붙여 두 자리로 맞춤(1바이트가 항상 2자리 16진수로 표현되기 때문)
    .join('');
};

//입력된 비밀번호를 다시 해시해서 저장된 해시와 비교
//일치하면 true, 다르면 false
export const compare = async (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
  const hashedPassword = await hash(plainPassword);
  return hashedPassword === encryptedPassword;
};

//HMAC => 해시 + 비밀 키 → 위조 방지
// 해시알고리즘 => 입력이 같으면 항상 같은 결과
// 대소문자 구분함, 해시값으로 원래값 복호화 불가능(단방향)