'use client';

import Form from '@/components/Form';
import { LogoIcon } from '@/components/icon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// interface CardDate {
//   month: string;
//   year: string;
// }

// type FormData = {
//   cardholderName: string;
//   cardNumber: string;
//   cardDate: CardDate;
//   cvc: string;
// };

// const schema = yup
//   .object({
//     cardholderName: yup.string().required("Can't be blank"),
//     cardNumber: yup
//       .string()
//       .required('Wrong format, numbers only!')
//       .matches(/^\d{0,16}$/, 'Only numbers are allowed')
//       .length(16, 'Invalid card number length'),
//     cardDate: yup.object().shape({
//       month: yup.string().required("Can't be blank").length(2, 'Invalid month'),
//       year: yup.string().required("Can't be blank").length(2, 'Invalid year'),
//     }),

//     cvc: yup
//       .string()
//       .required("Can't be blank")
//       .max(3, 'Invalid card cvc length'),
//   })
//   .required();

export default function Home() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   watch,
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  // const onSubmit = (data: FormData) => {
  //   console.log(data);
  // };

  // const cardNumber = watch('cardNumber');
  // console.log(cardNumber);

  // const formattedCardNumber = cardNumber
  //   ? cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  //   : '1234 5678 9123 0000';

  // const expiryMonth = watch('cardDate.month');
  // const expiryYear = watch('cardDate.year');
  return (
    <div>
      <Form
      // schema={schema}
      // formData={{
      //   cardholderName: '',
      //   cardNumber: '',
      //   cardDate: { month: '', year: '' },
      //   cvc: '',
      // }}
      // handleSubmit = {handleSubmit}
      // onSubmit={onSubmit}
      />
    </div>
  );
}
