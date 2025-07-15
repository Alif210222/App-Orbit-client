import React, { useEffect } from 'react';
import { FaLightbulb, FaRocket, FaUsers, FaHeart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white px-6 py-20">

            <Helmet>
                   <title>About| App Orbit</title>
              </Helmet>

      <div className="max-w-6xl mx-auto text-center" data-aos="fade-down">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          About Our Platform
        </h1>
        <p className="text-lg text-gray-300 mb-16 max-w-3xl mx-auto">
          We're on a mission to empower creators and makers to share their ideas with the world.
          Whether you're building a tool, designing a product, or launching a startup — this is your stage.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            data-aos="fade-up"
          >
            <FaLightbulb className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovative Ideas</h3>
            <p className="text-gray-300 text-sm">
              We embrace innovation and creativity, offering a platform that encourages thinking outside the box.
            </p>
          </div>

          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaRocket className="text-pink-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Launch Ready</h3>
            <p className="text-gray-300 text-sm">
              Quickly bring your ideas to life and launch them to a global audience. It's fast, secure, and simple.
            </p>
          </div>

          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaUsers className="text-green-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-300 text-sm">
              Our platform is built for people, by people. Join a supportive community that helps you grow.
            </p>
          </div>

          <div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaHeart className="text-red-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Built with Love</h3>
            <p className="text-gray-300 text-sm">
              Every feature is crafted with attention to detail. Because your journey deserves the best tools.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">Our Vision</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We believe everyone has a story, a skill, or a solution worth sharing. Our vision is to become the go-to platform for creators who want to build, showcase, and inspire — without limitations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
