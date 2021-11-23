import * as Yup from 'yup';

export const signUpValidation = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  rePassword: Yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same',
    ),
  }),
});

export const signInValidation = Yup.object({
  email: Yup.string(),
  // .email('Enter a valid email')
  // .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
