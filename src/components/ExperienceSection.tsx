"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/projects";

export default function ExperienceSection() {
  // 初期選択タブは最初のプロジェクト
  const [selectedTab, setSelectedTab] = useState(projects[0]?.id || "");

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* セクションタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">職務経歴</h2>
        </motion.div>

        {/* タブ一覧 */}
        <Tabs defaultValue={selectedTab} className="w-full" onValueChange={setSelectedTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 w-full h-auto">
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
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <CardTitle className="text-2xl font-noto-sans-jp">{project.title}</CardTitle>
                        <CardDescription className="mt-2 font-noto-sans-jp">
                          {project.company} | {project.period}
                        </CardDescription>
                      </div>
                      <Badge className="self-start md:self-center font-noto-sans-jp">{project.role}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* プロジェクト概要 */}
                      {project.overview && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">概要</h4>
                          <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">{project.overview}</p>
                        </div>
                      )}

                      {/* 担当業務 */}
                      <div>
                        <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">担当</h4>
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
                        <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">環境・技術</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.environment.map((item) => (
                            <Badge key={item} variant="secondary" className="font-noto-sans-jp">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 詳細業務 */}
                      <div>
                        <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">詳細</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {project.details.map((detail) => (
                            <li key={detail} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 成果・実績 */}
                      {project.achievements && project.achievements.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">成果</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {project.achievements.map((achievement) => (
                              <li key={achievement} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
