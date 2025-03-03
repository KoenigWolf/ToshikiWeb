"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Code, Layers } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { getPortfolioThumbnail } from "@/lib/utils";

// =====================================
// Portfolioカードの画像表示コンポーネント
// =====================================
function PortfolioCardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      {src.includes('default-thumbnail') ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <Code className="w-16 h-16 text-white opacity-70" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState<string | null>(null);
  
  // タグの一覧を取得（重複を除去）
  const allTags = Array.from(
    new Set(
      portfolioItems.flatMap(item => item.tags)
    )
  ).sort();
  
  // フィルタリングされたPortfolioアイテム
  const filteredItems = filter 
    ? portfolioItems.filter(item => item.tags.includes(filter))
    : portfolioItems;

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-noto-sans-jp">
            これまでに手がけたプロジェクトの一部をご紹介します。各プロジェクトの詳細ページでは、
            使用技術や開発プロセス、課題解決方法などをご覧いただけます。
          </p>
        </motion.div>

        {/* フィルタータグ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <Badge
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm font-noto-sans-jp"
            onClick={() => setFilter(null)}
          >
            すべて
          </Badge>
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm font-noto-sans-jp"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* Portfolioグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                <PortfolioCardImage 
                  src={getPortfolioThumbnail(item.thumbnail, item.githubUrl)} 
                  alt={item.title} 
                />
                <CardHeader className="pb-2">
                  <CardTitle className="font-noto-sans-jp">{item.title}</CardTitle>
                  <CardDescription className="font-noto-sans-jp">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="font-noto-sans-jp">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="font-noto-sans-jp">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="flex gap-2">
                    {item.githubUrl && (
                      <Button size="icon" variant="ghost" asChild>
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {item.demoUrl && (
                      <Button size="icon" variant="ghost" asChild>
                        <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" asChild className="gap-1">
                    <Link href={`/portfolio/${item.id}`}>
                      <span className="font-noto-sans-jp">詳細</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 