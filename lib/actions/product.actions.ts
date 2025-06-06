'use server'
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

//가장 최신 상품 가져오기(4개)
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {createdAt: 'desc'},
      take: LATEST_PRODUCTS_LIMIT, // 최신 상품 4개 가져오기
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error("가장 최신 상품가져오는부분에서의 오류남:", error);
    throw error;
  }
}

//단일 상품 정보 가져오기(상세)
export async function getProductBySlug(slug: string) {
  try {
    const data = await prisma.product.findUnique({
      where: { slug: slug },
    });
    if (!data) {
      throw new Error("해당 제품에 대한 상세 정보가 없습니다");
    }
    return convertToPlainObject(data);
  } catch (error) {
    console.error("단일 상품 정보 가져오는부분에서 오류남:", error);
    throw error;
  }
}

//상품에 대한 카테고리 전부 가져오기(갯수 리턴)
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true, // 조건(=> category)에 맞는 갯수를 리턴(입력은 boolean, 출력은 number )
  });

  return data;
}

/**특별 상품 가져오기(배너 노출할 상품)*/
export async function getFeaturedProducts() {
  try{
    const data = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
    return convertToPlainObject(data);
  } catch (error){
    console.error("특별 상품정보(배너 노출할 상품) 가져오는부분에서 오류남:", error);
    throw error;
  }
}
