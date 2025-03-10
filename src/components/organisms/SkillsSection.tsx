"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card";
import { ExternalLink } from "lucide-react";
import { skills } from "@/lib/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">Skill</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/skills/${encodeURIComponent(skillCategory.category)}`} className="block h-full">
                <Card className="h-full transition-shadow hover:shadow-md relative">
                  <CardHeader>
                    <CardTitle className="font-noto-sans-jp">{skillCategory.category}</CardTitle>
                    <ExternalLink className="h-4 w-4 text-primary absolute top-3 right-3" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill) => (
                        <Badge key={skill} className="font-noto-sans-jp">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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