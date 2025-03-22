import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Next.jsのキャッシュを再検証するAPIルート
 */
export async function POST(request: NextRequest) {
  try {
    // URLからpathパラメータを取得
    const path = request.nextUrl.searchParams.get("path");
    
    // 認証チェック（環境変数からシークレットを取得して比較）
    const authHeader = request.headers.get("authorization");
    const isAuthorized = process.env.REVALIDATION_SECRET && 
      authHeader === `Bearer ${process.env.REVALIDATION_SECRET}`;
    
    // 認証が無効な場合はエラーを返す
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // パスが指定されていない場合はエラーを返す
    if (!path) {
      return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
    }
    
    // 指定されたパスのキャッシュを再検証
    revalidatePath(path);
    
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
} 