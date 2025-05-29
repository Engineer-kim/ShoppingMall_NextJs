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