"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { selfPR } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">自己PR</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-noto-sans-jp">
            私の強みや価値観、目指すキャリアについてご紹介します。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-4">
                {selfPR.split('\n').map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 dark:text-gray-300 leading-relaxed font-noto-sans-jp">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-noto-sans-jp">
            技術力だけでなく、ビジネス視点を持ち、顧客や現場の課題解決に貢献できるエンジニアを目指しています。
            新しい挑戦や学びの機会を常に探しており、チームでの協働を通じて成長していきたいと考えています。
          </p>
        </motion.div>
      </div>
    </section>
  );
} 