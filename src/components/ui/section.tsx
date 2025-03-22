import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * セクションのスタイルバリエーション
 */
const sectionVariants = cva(
  "w-full py-20", // 基本スタイル
  {
    variants: {
      variant: {
        default: "bg-background",
        primary: "bg-primary/5",
        secondary: "bg-secondary/5",
        accent: "bg-accent/5",
        muted: "bg-muted",
        alternate: "even:bg-muted odd:bg-background",
      },
      spacing: {
        default: "py-20",
        sm: "py-10",
        lg: "py-24",
        xl: "py-32",
      },
      container: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
      container: true,
    },
    compoundVariants: [
      {
        container: true,
        class: "",
      },
    ],
  }
);

/**
 * Sectionコンポーネントのプロパティ
 */
export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * セクションID（ナビゲーション用）
   */
  id?: string;
  /**
   * 子要素
   */
  children: React.ReactNode;
  /**
   * コンテナを内部で適用するかどうか
   */
  container?: boolean;
}

/**
 * セクションコンポーネント
 * 
 * ページを構成するセクションを表示するコンポーネント。
 * 一貫したスペーシングと背景色のバリエーションを提供します。
 * 
 * @example
 * ```tsx
 * <Section id="about" variant="primary">
 *   <h2>About Us</h2>
 *   <p>Content goes here</p>
 * </Section>
 * ```
 */
export function Section({
  id,
  variant,
  spacing,
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ variant, spacing, container }), className)}
      {...props}
    >
      {container ? (
        <div className="container px-4 mx-auto">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
} 