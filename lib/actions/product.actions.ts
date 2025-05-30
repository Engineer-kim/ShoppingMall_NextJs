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
    console.error("Error fetching latest products:", error);
    throw error;
  }
}