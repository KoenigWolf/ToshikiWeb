import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

type RevalidateResponse = {
  success: boolean;
  message?: string;
  path?: string;
  timestamp?: string;
};

/**
 * キャッシュを再検証するためのAPI Route
 * POST /api/revalidate?path=<path>
 */
export async function POST(request: NextRequest): Promise<NextResponse<RevalidateResponse>> {
  try {
    // POSTパラメータからPathを取得
    const path = request.nextUrl.searchParams.get('path');
    
    // パスが指定されていない場合
    if (!path) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Path parameter is required for revalidation' 
        }, 
        { status: 400 }
      );
    }

    // 認証チェック - 本番環境では環境変数から取得したシークレットを使用
    const authHeader = request.headers.get('authorization');
    const expectedHeader = `Bearer ${process.env.REVALIDATE_SECRET}`;
    
    if (process.env.NODE_ENV === 'production' && authHeader !== expectedHeader) {
      console.warn(`Unauthorized revalidation attempt for path: ${path}`);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Unauthorized' 
        }, 
        { status: 401 }
      );
    }

    // 指定されたPathのキャッシュを再検証
    revalidatePath(path);
    
    // 成功レスポンスを返す
    return NextResponse.json({
      success: true,
      message: 'Revalidation succeeded',
      path,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // エラー情報をログに残す
    console.error('Revalidation error:', error);
    
    // クライアントに安全なエラーメッセージを返す
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error 
          ? `Revalidation failed: ${error.message}` 
          : 'An unknown error occurred during revalidation'
      }, 
      { status: 500 }
    );
  }
} 