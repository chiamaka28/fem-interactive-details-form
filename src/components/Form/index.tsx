'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Success from '../Success';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface CardDate {
  month: string;
  year: string;
}

type FormData = {
  cardholderName: string;
  cardNumber: string;
  cardDate: CardDate;
  cvc: string;
};

const schema = yup
  .object({
    cardholderName: yup.string().required("Can't be blank"),
    cardNumber: yup
      .string()
      .required("Can't be blank")
      .max(16, 'Invalid card number length')
      .matches(/^\d{0,16}$/, 'Wrong format, numbers only!')
      .length(16, 'Invalid card number length'),
    cardDate: yup.object().shape({
      month: yup.string().required("Can't be blank").length(2, 'Invalid month'),
      year: yup.string().required("Can't be blank").length(2, 'Invalid year'),
    }),

    cvc: yup
      .string()
      .required("Can't be blank")
      .max(3, 'Invalid card cvc length'),
  })
  .required();

const Form: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const cardNumber = watch('cardNumber');

  const formattedCardNumber = cardNumber
    ? cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
    : '1234 5678 9123 0000';

  const expiryMonth = watch('cardDate.month');
  const expiryYear = watch('cardDate.year');
  return (
    <div className='md:flex md:gap-10  lg:gap-20'>
      <div className='h-72 md:w-[50%] lg:w-[40%] md:h-screen bg-[url("/bg-main-mobile.png")] bg-cover bg-no-repeat flex items-center justify-center md:justify-end  relative'>
        <div className='absolute top-8 md:top-1/4  flex items-center  justify-center flex-col md:flex-col-reverse md:translate-x-20 lg:translate-x-40'>
          <div className=' relative '>
            <img
              src='/bg-card-back.png'
              className='w-[280px] sm:w-[350px] lg:w-[400px] '
              alt='card-back'
            />
            <div className='absolute top-[43%] right-10'>
              <p>{watch('cvc') || '000'}</p>
            </div>
          </div>
          <div className=' relative -translate-y-10  -translate-x-8 md:-translate-x-12 lg:-translate-x-20 flex justify-center '>
            <div className='absolute w-14 lg:w-16 top-4  left-5 z-30'>
              <img src='/card-logo.svg' alt='card-logo' />
            </div>
            <img
              src='/bg-card-front.png'
              className='w-[280px] sm:w-[320px] lg:w-[400px]  '
              alt='front-card'
            />
            <div className='absolute bottom-7   text-white lg:flex lg:flex-col lg:items-center  '>
              <p className='lg:tracking-[3px] tracking-wider text-lg  w-full lg:bottom-12 '>
                {formattedCardNumber}
              </p>
              <div className='flex justify-between w-full'>
                <p>{watch('cardholderName') || 'Jane Appleseed'}</p>
                <p>
                  {expiryMonth && expiryYear
                    ? `${expiryMonth}/${expiryYear}`
                    : '00/00'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center md:h-screen md:w-[100%]'>
        {isSubmitted ? (
          <Success />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='container mt-16 md:mt-0  max-w-[400px] '
          >
            <div>
              <label
                htmlFor='cardholderName'
                className='text-darkViolet text-sm  font-medium '
              >
                Cardholder Name
              </label>
              <input
                type='text'
                placeholder='e.g. Jane Appleseed'
                id='cardholderName'
                {...register('cardholderName')}
                className={`block border border-lightGrayishViolet focus:border  px-4 my-1  h-10 w-full rounded-lg focus:outline-none  `}
              />
              <span className='text-xs text-red'>
                {errors.cardholderName?.message}
              </span>
            </div>
            <div>
              <label
                htmlFor='cardNumber'
                className='text-darkViolet text-sm mt-2 font-medium '
              >
                Card Number
              </label>
              <input
                type='text'
                placeholder='e.g. 1234 5678 9123 0000'
                id='cardNumber'
                {...register('cardNumber')}
                className={`block border border-lightGrayishViolet focus:border px-4 my-1  h-10 w-full rounded-lg focus:outline-none`}
              />
              <span className='text-xs text-red'>
                {errors.cardNumber?.message}
              </span>
            </div>
            <div className='flex gap-4 items-center mt-2'>
              <fieldset className='basis-1/2'>
                <legend className='text-darkViolet text-sm   font-medium '>
                  Exp. Date (MM/YY)
                </legend>
                <div className='flex   gap-2 '>
                  <input
                    type='text'
                    placeholder='MM'
                    id='expDate'
                    {...register('cardDate.month')}
                    className={`block border border-lightGrayishViolet focus:border px-4   h-10 w-1/2  rounded-lg focus:outline-none`}
                  />
                  <input
                    type='text'
                    placeholder='YY'
                    id='expDate'
                    {...register('cardDate.year')}
                    className={`block border border-lightGrayishViolet focus:border px-4   h-10 w-1/2 rounded-lg focus:outline-none`}
                  />
                </div>
                {errors.cardDate && (
                  <p className='text-red text-xs'>
                    {errors.cardDate.month?.message ||
                      errors.cardDate.year?.message}
                  </p>
                )}
              </fieldset>
              <div className='basis-1/2 '>
                <label
                  htmlFor='cvc'
                  className='text-darkViolet text-sm  font-medium'
                >
                  CVC
                </label>
                <input
                  type='text'
                  placeholder=' e.g. 123'
                  id='cvc'
                  {...register('cvc')}
                  className={`block border border-lightGrayishViolet focus:border px-4  h-10 w-full  rounded-lg focus:outline-none`}
                />
                {errors.cvc && (
                  <span className='text-red text-xs'>
                    {errors.cvc?.message}
                  </span>
                )}
              </div>
            </div>
            <button className='w-full h-12 text-center bg-darkViolet text-white rounded-lg my-5'>
              <p>Confirm</p>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
