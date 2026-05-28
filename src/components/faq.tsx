"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you provide home delivery for pet food and accessories?",
    answer: "Yes, we provide home delivery within Pollachi city limits. For orders outside the city, delivery charges may apply based on the distance.",
  },
  {
    question: "Are your puppies and kittens vaccinated?",
    answer: "Absolutely! All our puppies and kittens come with their first round of vaccinations completed and are dewormed. We also provide a health record card with every purchase.",
  },
  {
    question: "Can I pre-order a specific exotic pet?",
    answer: "Yes, if you are looking for a specific breed or exotic pet, we can arrange it for you. Please visit our store or contact us via WhatsApp to discuss your requirements.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-forest md:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-2 text-gray-600">Got questions? We have answers.</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-forest">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
