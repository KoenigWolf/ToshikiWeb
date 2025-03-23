"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

// バリデーションスキーマ
const formSchema = z.object({
  name: z.string().min(2, { message: "お名前は2文字以上で入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  subject: z.string().min(2, { message: "件名を入力してください" }),
  message: z.string().min(3, { message: "メッセージは3文字以上で入力してください" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

// フィールド共通パーツ
type FieldGroupProps = {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  isTextarea?: boolean;
  form: ReturnType<typeof useForm<ContactFormValues>>;
};

// 単一のフォームフィールドを描画する汎用コンポーネント
function FieldGroup({
  name,
  label,
  placeholder,
  isTextarea = false,
  form,
}: FieldGroupProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-noto-sans-jp">{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className="min-h-32"
                {...field}
              />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage className="font-noto-sans-jp" />
        </FormItem>
      )}
    />
  );
}

// お問い合わせフォーム本体
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 送信処理
  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");

    try {
      // 通常はここでAPIにPOSTする
      console.log(values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      form.reset();
      setStatus("success");

      // 一定時間後にメッセージを非表示に
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("idle");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 成功メッセージ */}
        {status === "success" && (
          <div className="p-4 text-sm text-center text-green-700 bg-green-100 rounded-lg">
            お問い合わせが送信されました。ありがとうございます。
          </div>
        )}

        {/* フォーム各項目 */}
        <FieldGroup
          name="name"
          label="お名前"
          placeholder="山田 太郎"
          form={form}
        />
        <FieldGroup
          name="email"
          label="メールアドレス"
          placeholder="example@example.com"
          form={form}
        />
        <FieldGroup
          name="subject"
          label="件名"
          placeholder="お問い合わせ内容"
          form={form}
        />
        <FieldGroup
          name="message"
          label="メッセージ"
          placeholder="ご質問・ご依頼内容をご記入ください"
          isTextarea
          form={form}
        />

        {/* 送信ボタン */}
        <Button type="submit" className="w-full" disabled={status === "submitting"}>
          <Send className="w-4 h-4 mr-2" />
          {status === "submitting" ? "送信中..." : "送信する"}
        </Button>
      </form>
    </Form>
  );
}
