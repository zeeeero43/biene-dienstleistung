import React from 'react';
import { Hero } from './Hero';
import { Services } from './Services';
import { About } from './About';
import { HowItWorks } from './HowItWorks';
import { Trust } from './Trust';
import { Contact } from './Contact';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <About />
      <Trust />
      <Contact />
    </>
  );
};