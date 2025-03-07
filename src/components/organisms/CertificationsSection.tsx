"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card";
import { ExternalLink } from "lucide-react";
import { certifications } from "@/lib/profile";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">Shikaku</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 font-noto-sans-jp">取得資格一覧</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((certification, index) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/certifications/${certification.id}`} className="block h-full">
                <Card className="h-full transition-shadow hover:shadow-md relative">
                  <CardHeader>
                    <CardTitle className="text-lg font-noto-sans-jp">{certification.name}</CardTitle>
                    <ExternalLink className="h-4 w-4 text-primary absolute top-3 right-3" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 font-noto-sans-jp">
                      {certification.date}
                    </p>
                    {certification.issuer && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2 font-noto-sans-jp">
                        発行元：{certification.issuer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 