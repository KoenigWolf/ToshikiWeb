"use client";

import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "お名前は2文字以上で入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  subject: z.string().min(2, { message: "件名を入力してください" }),
  message: z.string().min(10, { message: "メッセージは10文字以上で入力してください" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // Here you would normally send the form data to your API
      console.log(values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset the form and show success message
      form.reset();
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isSuccess && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            お問い合わせが送信されました。ありがとうございます。
          </div>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-noto-sans-jp">お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田 太郎" {...field} />
              </FormControl>
              <FormMessage className="font-noto-sans-jp" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-noto-sans-jp">メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage className="font-noto-sans-jp" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-noto-sans-jp">件名</FormLabel>
              <FormControl>
                <Input placeholder="お問い合わせ内容" {...field} />
              </FormControl>
              <FormMessage className="font-noto-sans-jp" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-noto-sans-jp">メッセージ</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="ご質問・ご依頼内容をご記入ください"
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="font-noto-sans-jp" />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "送信中..." : "送信する"}
        </Button>
      </form>
    </Form>
  );
} 