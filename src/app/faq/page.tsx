
'use client';

import { FaqMonochrome } from "@/components/ui/faq-monochrome";

const faqItems = [
    {
        question: "Can I participate in multiple events?",
        answer: "Yes, provided the event timings do not overlap. Check the schedule before registering."
    },
    {
        question: "Is accommodation provided for outstation students?",
        answer: "Yes, on-campus hostel accommodation is available for a nominal fee of $10/night."
    },
    {
        question: "What is the registration fee?",
        answer: "Registration fees vary by event. Please check the specific event pages for details. The main hackathon has a nominal fee to ensure serious participation."
    },
    {
        question: "Are there any prerequisites for the workshops?",
        answer: "Some workshops may have prerequisites, which are listed on the workshop page. The 'Generative AI & LLMs' workshop requires a laptop with Python 3.8+ installed."
    },
    {
        question: "Who can I contact for sponsorship inquiries?",
        answer: "Please reach out to our sponsorship team at sponsors@ignitefest.com or download our sponsorship brochure from the sponsors page."
    }
]

export default function FAQPage() {
  return (
    <FaqMonochrome items={faqItems} />
  );
}
