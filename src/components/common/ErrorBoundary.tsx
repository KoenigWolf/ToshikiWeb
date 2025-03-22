"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * エラーバウンダリコンポーネント
 * 子コンポーネントでエラーが発生したときに、エラー画面を表示する
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // エラー発生時の状態を更新
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // エラーログを出力（実際のアプリケーションでは、サーバーに送信するなどの処理が入る）
    console.error("エラーが発生しました:", error, errorInfo);
  }

  // エラー状態をリセットしてコンポーネントを再レンダリングする
  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // カスタムのフォールバックUIがある場合はそれを使用
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトのエラー表示
      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                エラーが発生しました
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>コンテンツの読み込みに失敗しました</AlertTitle>
                <AlertDescription>
                  申し訳ありませんが、コンテンツの読み込み中にエラーが発生しました。
                </AlertDescription>
              </Alert>
              
              {this.state.error && (
                <div className="p-3 mb-4 overflow-auto text-sm rounded max-h-32 bg-muted">
                  {this.state.error.toString()}
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex items-center"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  再試行
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
} 