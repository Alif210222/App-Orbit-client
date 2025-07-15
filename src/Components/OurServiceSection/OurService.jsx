import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaShieldAlt,
  FaCloud,
  FaMobileAlt,
  FaServer,
  FaLock
} from 'react-icons/fa';

const services = [
  {
    icon: <FaLaptopCode className="text-4xl text-amber-500" />,
    title: "Web Development",
    description: "Build responsive, user-friendly websites tailored to your needs."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-400" />,
    title: "Cybersecurity",
    description: "Protect your data with modern security protocols and audits."
  },
  {
    icon: <FaCloud className="text-4xl text-sky-400" />,
    title: "Cloud Solutions",
    description: "Deploy scalable cloud infrastructure for your growing business."
  },
  {
    icon: <FaMobileAlt className="text-4xl text-pink-400" />,
    title: "Mobile Apps",
    description: "We craft performant mobile apps for Android and iOS platforms."
  },
  {
    icon: <FaServer className="text-4xl text-purple-400" />,
    title: "Server Management",
    description: "Reliable hosting, maintenance, and uptime monitoring services."
  },
  {
    icon: <FaLock className="text-4xl text-red-400" />,
    title: "Data Encryption",
    description: "Secure your communications with strong encryption algorithms."
  }
];

const OurServices = () => {
  return (
    <div className="py-20 px-6 mb-14">
      <h2 className="text-center text-4xl font-bold text-white mb-12">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-[#4e392f] hover:bg-[#5a4033] transition rounded-2xl shadow-lg p-6 text-white  hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
