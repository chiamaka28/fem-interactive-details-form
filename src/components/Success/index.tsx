import React from 'react';
import { SuccessIcon } from '../icon';
const Success = () => {
  return (
    <div className='mt-20 md:mt-0 container max-w-[400px]'>
      <div className='flex flex-col gap-4 items-center justify-center '>
        <SuccessIcon />
        <h2>THANK YOU!</h2>
        <p>We've added your card details</p>
        <button className='w-full h-12 text-center bg-darkViolet text-white rounded-lg my-5'>
          <p>Continue</p>
        </button>
      </div>
    </div>
  );
};

export default Success;
