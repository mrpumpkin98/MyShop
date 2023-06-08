import { setupServer } from "msw/node";
import { apis } from "./apis";

// 목킹 데이터를 가짜 서버로 돌릴 수 있도록 설정
export const server = setupServer(...apis);
