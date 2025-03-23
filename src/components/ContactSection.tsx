"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./common/ContactForm";
import { Mail } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";

export function ContactSection() {
  return (
    <Section id="contact" variant="primary">
      <SectionTitle 
        title="Contact" 
        animated
        centered
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          <div className="mb-6 text-center">
            <Mail className="w-12 h-12 p-2 mx-auto text-white rounded-full bg-primary" />
            <h3 className="mt-4 mb-2 text-xl font-semibold font-noto-sans-jp">お問い合わせはこちらから</h3>
            <p className="text-gray-600 font-noto-sans-jp dark:text-gray-400">
              ご質問、お仕事のご依頼など、お気軽にお問い合わせください。
            </p>
          </div>
          
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
} 