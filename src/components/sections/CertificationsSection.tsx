"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data/profile";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";

export function CertificationsSection() {
  return (
    <Section id="certifications" variant="muted">
      <SectionTitle
        title="Shikaku"
        subtitle="資格・認定"
        animated
        centered
      />

      <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, index) => (
          <motion.div
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/certifications/${certification.id}`} className="block h-full">
              <Card className="relative h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-noto-sans-jp">{certification.name}</CardTitle>
                  <ExternalLink className="absolute w-4 h-4 text-primary top-3 right-3" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-noto-sans-jp">
                    {certification.date}
                  </p>
                  {certification.issuer && (
                    <p className="mt-2 text-muted-foreground font-noto-sans-jp">
                      発行元：{certification.issuer}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
} 