import { Header } from "./Header";
import { Footer } from "@/components/common/Footer";
import { DetailLayoutContent, type DetailLayoutContentProps } from "./DetailLayoutContent";
import type { ReactNode } from "react";

// =====================================
// 詳細ページの共通レイアウト
// =====================================
export interface DetailLayoutProps extends Omit<DetailLayoutContentProps, 'children'> {
  /** 子要素 */
  children: ReactNode;
}

export function DetailLayout(props: DetailLayoutProps) {
  return (
    <>
      <Header />
      <DetailLayoutContent {...props} />
      <Footer />
    </>
  );
} 