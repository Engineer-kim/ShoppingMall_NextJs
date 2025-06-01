import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Prsima Object 를 JSON 형태로 변환(파싱), 객체니까 JSON.stringify 사용
export function converToPlainObject<T>(value: T): T {
    //중첩된 구조까지 안전하게 복사하여 원본과 분리된 객체를 만들기 위해서
    //Deep copy랑 같은효과임
    return JSON.parse(JSON.stringify(value));
}


//소숫점 표기를 위한 함수
export function formatNumberWithDecimal(num: number): string {
  //소수점 둘째 자리 표시
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

//리다이렉션 함수
export function isRedirectError(error: unknown): boolean {
  // digest는 NextJs에서 지정하는 속성중하나
  // 에러는 기본적으로 알 수 없는 타입인 unkonwn(Any랑 다름)타입임
  return (
    typeof error === 'object' && error !== null && 'digest' in error &&
    (error as { digest?: unknown }).digest === 'NEXT_REDIRECT'
  );
}
