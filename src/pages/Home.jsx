import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import BlogList from '../components/sections/BlogList';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects limit={4} />
      <BlogList limit={3} />
      <Contact />
    </>
  );
};

export default Home;