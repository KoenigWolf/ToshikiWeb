"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { selfPR } from "@/lib/data/profile";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";

export function AboutSection() {
  return (
    <Section id="about" variant="default">
      <SectionTitle
        title="PR"
        subtitle="自己紹介"
        animated
        centered
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card>
          <CardContent className="relative p-8">
            <div className="space-y-4">
              {selfPR.split('\n').map((paragraph, index) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground font-noto-sans-jp">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link 
              href="/about" 
              className="absolute top-3 right-3 text-primary hover:text-primary/80"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link href="/about" className="inline-block">
            <Button variant="outline">
              詳細を見る
            </Button>
          </Link>
        </div>
      </motion.div>
    </Section>
  );
} 