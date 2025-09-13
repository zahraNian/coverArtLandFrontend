import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What is the ?",
    answer:
      "I dont know.",
  },
  {
    question: "What is the ?",
    answer:
      "I dont know.",
  },
  {
    question: "What is the ?",
    answer:
      "I dont know.",
  },
  {
    question: "What is the ?",
    answer:
      "I dont know.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-1">
        Frequently asked questions
      </h3>
      <p className="text-base sm:text-lg text-gray-400 mb-5 sm:mb-6">
        Find answers to common questions about this design
      </p>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
