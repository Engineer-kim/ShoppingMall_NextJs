'use server'
import { prisma } from "@/db/prisma";
import { converToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

//가장 최신 상품 가져오기
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {createdAt: 'desc'},
      take: LATEST_PRODUCTS_LIMIT, // 최신 상품 4개 가져오기
    });
    return converToPlainObject(data);
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
    return converToPlainObject(data);
  } catch (error) {
    console.error("단일 상품 정보 가져오는부분에서 오류남:", error);
    throw error;
  }
}