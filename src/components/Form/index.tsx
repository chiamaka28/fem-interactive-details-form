'use client';

import React from 'react';
import { LogoIcon } from '../icon';
import { useForm } from 'react-hook-form';
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
  cvc: number;
};

const schema = yup
  .object({
    cardholderName: yup.string().required(),
    cardNumber: yup
      .string()
      .matches(/^\d{0,16}$/, 'Only numbers are allowed')
      .length(16, 'Invalid card number length')
      .required(),
    cardDate: yup.object().shape({
      month: yup.string().required("Can't be blank").length(2, 'Invalid month'),
      year: yup.string().required("Can't be blank").length(2, 'Invalid year'),
    }),

    cvc: yup.number().required("Can't be blank"),
  })
  .required();

const Form = () => {
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
          <div className=' relative'>
            <img
              src='/bg-card-back.png'
              className='w-[280px] sm:w-[350px] lg:w-[400px] translate-x-6'
              alt=''
            />
            <div className='absolute top-[43%] right-6'>
              <p>{watch('cvc') || '000'}</p>
            </div>
          </div>
          <div className=' relative'>
            <div className='absolute w-2 -top-6 z-30'>
              <LogoIcon />
            </div>
            <img
              src='/bg-card-front.png'
              className='w-[280px] sm:w-[350px] lg:w-[400px] -translate-y-10  -translate-x-4 '
              alt=''
            />
            <div className='absolute bottom-16 lg:left-5 text-white '>
              <p className='lg:tracking-[3px] text-lg'>{formattedCardNumber}</p>
              <div className='flex gap-20'>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='container mt-16 md:mt-0  max-w-[400px] '
        >
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
            className={`block border border-lightGrayishViolet focus:border px-4 my-2  h-10 w-full rounded-lg focus:outline-none`}
          />
          <label
            htmlFor='cardNumber'
            className='text-darkViolet font-medium text-left'
          >
            Card Number
          </label>
          <input
            type='text'
            placeholder='e.g. 1234 5678 9123 0000'
            id='cardNumber'
            {...register('cardNumber')}
            className={`block border border-lightGrayishViolet focus:border px-4 mt-2  h-10 w-full rounded-lg focus:outline-none`}
          />
          <span className='text-xs text-red'>{errors.cardNumber?.message}</span>

          <div className='flex gap-4 '>
            <fieldset className='basis-1/2'>
              <legend className='text-darkViolet font-medium '>
                Exp. Date (MM/YY)
              </legend>
              <div className='flex my-2 gap-2'>
                <input
                  type='text'
                  placeholder='MM'
                  id='expDate'
                  {...register('cardDate.month')}
                  className={`block border border-lightGrayishViolet focus:border px-4  h-10 w-1/2  rounded-lg focus:outline-none`}
                />

                <input
                  type='text'
                  placeholder='YY'
                  id='expDate'
                  {...register('cardDate.year')}
                  className={`block border border-lightGrayishViolet focus:border px-4  h-10 w-1/2 rounded-lg focus:outline-none`}
                />
              </div>
              {errors.cardDate && (
                <p className='text-red-500'>
                  {errors.cardDate.month?.message ||
                    errors.cardDate.year?.message}
                </p>
              )}
            </fieldset>
            <div className='basis-1/2'>
              <label htmlFor='cvc' className='text-darkViolet font-medium'>
                CVC
              </label>
              <input
                type='text'
                placeholder=' e.g. 123'
                id='cvc'
                {...register('cvc')}
                className={`block border border-lightGrayishViolet focus:border px-4 my-2 h-10 w-full  grow rounded-lg focus:outline-none`}
              />
              {errors.cvc && (
                <span className='text-red-500'>{errors.cvc?.message}</span>
              )}
            </div>
          </div>
          <button className='w-full h-12 text-center bg-darkViolet text-white rounded-lg my-5'>
            <p>Confirm</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
