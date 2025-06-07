import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Prsima Object 를 JSON 형태로 변환(파싱), 객체니까 JSON.stringify 사용
export function convertToPlainObject<T>(value: T): T {
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

export type FormattedErrorResult = {
  fieldErrors: { [key: string]: string }; //에러가 발생한 인풋(어떤 인풋값이 오류인지)
  errorMessage: string; //에러 메세지
};


//회원가입 폼 Validation 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any): Promise<FormattedErrorResult>{
  if (error.name === 'ZodError'){
   const fieldErrors: { [key: string]: string } = {};
    /**
    [
      {
        ...,
        ..,
        "message": "사용자 이름은 최소 3자 이상이어야 합니다.",
        "path": ["username"]
      }
    ]*/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error.errors.forEach((err: any) => {
      if (err.path && err.path.length > 0) {
        const fieldName = err.path[0]; //ex) userName 
        fieldErrors[fieldName] = err.message;  // ex) 사용자 이름은 최소 3자 이상이어야 합니다
      }
    });
     return { fieldErrors, errorMessage: '입력값을 다시 확인해주세요.' };
  }else if(error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002'){
    const field = error.meta?.target ? error.meta.target[0] : '정보';
    const errorMessage = `해당 ${field.charAt(0).toUpperCase() + field.slice(1)} 은(는) 이미 사용중입니다`;
    return { fieldErrors: { [field]: errorMessage }, errorMessage: errorMessage };
  }else {
    const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
    return { fieldErrors: {}, errorMessage: errorMessage };
  }
}


//반올림함수
export function round2(value: number| string) {
  if (typeof value === 'number'){
    //EPSILON 사용 하는이유: 외화일경우 소수점 표현시 정밀도 Upgrade 목적
    return Math.round((value + Number.EPSILON) * 100) / 100 ;
  }else if (typeof value === 'string'){
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100 ;
  }else {
    throw new Error('Value is not a number or string')
  }
}