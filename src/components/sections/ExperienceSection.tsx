"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data/projects";

export function ExperienceSection() {
  // 初期選択タブは最初のプロジェクト
  const [selectedTab, setSelectedTab] = useState(projects[0]?.id || "");

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl font-noto-sans-jp">Career</h2>
        </motion.div>

        {/* タブ一覧 */}
        <Tabs defaultValue={selectedTab} className="w-full" onValueChange={setSelectedTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TabsList className="grid w-full h-auto grid-cols-2 mb-8 md:grid-cols-3 lg:grid-cols-6">
              {projects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className="py-3 font-noto-sans-jp"
                >
                  {project.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* タブごとのコンテンツ */}
          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={selectedTab === project.id ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="relative">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                      <div>
                        <CardTitle className="text-2xl font-noto-sans-jp">{project.title}</CardTitle>
                        <CardDescription className="mt-2 font-noto-sans-jp">
                          {project.company} | {project.period}
                        </CardDescription>
                      </div>
                      <Badge className="self-start md:self-center font-noto-sans-jp">{project.role}</Badge>
                    </div>
                    <Link 
                      href={`/experience/${project.id}`} 
                      className="absolute top-3 right-3 text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* プロジェクト概要 */}
                      {project.overview && (
                        <div>
                          <h4 className="mb-2 text-lg font-semibold font-noto-sans-jp">概要</h4>
                          <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">{project.overview}</p>
                        </div>
                      )}

                      {/* 担当業務 */}
                      <div>
                        <h4 className="mb-2 text-lg font-semibold font-noto-sans-jp">担当</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.responsibilities.map((item) => (
                            <Badge key={item} variant="outline" className="font-noto-sans-jp">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 使用技術 */}
                      <div>
                        <h4 className="mb-2 text-lg font-semibold font-noto-sans-jp">環境・技術</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.environment.map((item) => (
                            <Badge key={item} variant="secondary" className="font-noto-sans-jp">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 詳細を見るボタン */}
                      <div className="pt-4 text-center">
                        <Link href={`/experience/${project.id}`} passHref>
                          <Button variant="outline">
                            詳細を見る
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
} 