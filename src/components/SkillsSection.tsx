"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { skills } from "@/lib/data/profile";
import type { SkillCategory } from "@/lib/types/skill";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";

export function SkillsSection() {
  return (
    <Section id="skills" variant="default">
      <SectionTitle
        title="Skill"
        animated
        centered
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skillCategory: SkillCategory, index) => (
          <motion.div
            key={skillCategory.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/skills/${encodeURIComponent(skillCategory.category)}`} className="block h-full">
              <Card className="relative h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-noto-sans-jp">{skillCategory.category}</CardTitle>
                  <ExternalLink className="absolute w-4 h-4 text-primary top-3 right-3" />
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
    </Section>
  );
} 