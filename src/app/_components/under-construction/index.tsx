import Image from 'next/image';
import React from 'react';

const UnderConstruction: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-7 text-center'>
      <Image
        src={'/503-planned.svg'}
        alt='No Page Found'
        width={400}
        height={400}
        priority
      />
    </div>
  );
};

export default UnderConstruction;
