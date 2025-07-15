import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What is this website about?",
    answer: "Our platform showcases and supports innovative tech products built by passionate creators."
  },
  {
    question: "How can I add a product?",
    answer: "Simply create an account, go to the 'Add Product' section, and fill in the form with your product info."
  },
  {
    question: "Is there a subscription required?",
    answer: "Basic access is free. Verified membership offers premium features like unlimited product listings."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our team through the contact form in the footer or by emailing support@ap-orbit.com."
  },
  {
    question: "Can I edit my product after posting?",
    answer: "Yes, just visit your 'My Products' page and click the edit button beside any product."
  },
  {
    question: "Are all product listings reviewed?",
    answer: "Yes, our moderators review all listings for accuracy, safety, and relevance before publishing."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 text-white">Frequently Asked Questions</h2>
        <p className="text-gray-400">Answers to the most common questions about our platform and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-[#3f2b1d]"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openIndex === index ? (
                <FaChevronUp className="text-amber-500" />
              ) : (
                <FaChevronDown className="text-amber-500" />
              )}
            </div>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-3 text-gray-300"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
