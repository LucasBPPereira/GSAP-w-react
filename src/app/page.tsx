// src/pages/index.tsx

import React from 'react';
import RevealCircle from '@/components/PageTransition';

const Home: React.FC = () => {
  return (
    <div className='w-full h-screen'>
      <RevealCircle />
    </div>
  );
};

export default Home;
