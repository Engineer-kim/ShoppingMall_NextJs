import { z } from 'zod';
import { formatNumberWithDecimal } from '@/lib/utils';

const currency = z.string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    '가격은 외화 일경우 소숫점형태로 기입되야합니다 (e.g.: 49.99)'
  )

// 상품 정보 인서트 시 유효성 검사
export const insertProductSchema = z.object({
  name: z.string().min(3, '이름은 필수 최소 3자 이상 입력 해주세요'),
  slug: z.string().min(3, '슬러그는 필수 최소 3자 이상 입력 해주세요'),
  category: z.string().min(3, '카테고리는 필수 최소 3자 이상 입력 해주세요'),
  brand: z.string().min(3, '브랜드는 필수 최소 3자 이상 입력 해주세요'),
  description: z.string().min(3, '상품상세는 필수 최소 3자 이상 입력 해주세요'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, '상품사진은 필수 최소 1장 이상 업로드 해주세요'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// 사용자 로그인
export const signInFormSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상 입력해주세요'),
})

//사용자 회원가입
export const signUpFormSchema = z.object({
  name: z.string().min(3, '이름은 최소 3자 이상 입력해주세요'),
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상 입력해주세요'),
  confirmPassword: z.string().min(6, '비밀번호는 최소 6자 이상 입력해주세요'),
}).refine((data) => data.password === data.confirmPassword ,{
  message:"입력하신 패스워드가 일치 하지 않습니다.",
  path: ['confirmPassword']
})

//장바구니
export const cartItemSchema = z.object({
  productId: z.string().min(1, '상품아이디는 필수입니다'),
  name: z.string().min(1, '상품명을 입력해주세요'),
  slug: z.string().min(1, '상품의 식별명은 필수입니다'),
  qty: z.number().int().nonnegative('물건의 수량은 0 이상이여야합니다'),
  image: z.string().min(1, '상품의 이미지를 입력해주세요'),
  price: currency
});

//장바구니 물품 추가시(인서트시)
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, '세션 카트아이디의 값은 필수입니다'),
  userId: z.string().optional().nullable(), //로그인 없이도 카트에 담을수 있도록
});