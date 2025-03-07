"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { ExternalLink } from "lucide-react";
import { selfPR } from "@/lib/profile";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">PR</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 font-noto-sans-jp">自己紹介</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg relative">
            <CardContent className="p-8">
              <div className="space-y-4">
                {selfPR.split('\n').map((paragraph, index) => (
                  <p key={`paragraph-${index}`} className="text-gray-700 dark:text-gray-300 leading-relaxed font-noto-sans-jp">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link 
                href="/about" 
                className="absolute top-3 right-3 text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <Link href="/about" passHref>
              <Button variant="outline" className="font-noto-sans-jp">
                詳細プロフィールを見る
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 