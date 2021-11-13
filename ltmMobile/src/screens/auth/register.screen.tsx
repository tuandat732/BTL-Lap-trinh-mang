import React from 'react';
import {useFormik} from 'formik';
import {ScrollView, Text, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {authService} from '../../services/auth.service';
import {signUpValidation} from './validation';
import {navigationService} from '../../services/navigation.service';

function RegisterScreen() {
  const initialValues = {
    email: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  };

  const onSubmit = values => {
    authService.postRegister(values).subscribe(_ => {
      navigationService.navigate('login');
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: onSubmit,
  });

  return (
    <View>
      <ScrollView>
        <FormControl>
          <TextInput
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <Error>{formik.errors.email}</Error>
          )}
        </FormControl>
        <FormControl>
          <TextInput
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber) && (
            <Error>{formik.errors.phoneNumber}</Error>
          )}
        </FormControl>
        <FormControl>
          <TextInput
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && Boolean(formik.errors.firstName) && (
            <Error>{formik.errors.firstName}</Error>
          )}
        </FormControl>
        <FormControl>
          <TextInput
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && Boolean(formik.errors.lastName) && (
            <Error>{formik.errors.lastName}</Error>
          )}
        </FormControl>
        <FormControl>
          <TextInput
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && Boolean(formik.errors.password) && (
            <Error>{formik.errors.password}</Error>
          )}
        </FormControl>
        <FormControl>
          <TextInput
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && Boolean(formik.errors.rePassword) && (
            <Error>{formik.errors.rePassword}</Error>
          )}
        </FormControl>
      </ScrollView>
    </View>
  );
}

const FormControl = styled(View)``;

const Error = styled(Text)`
  color: 'red';
`;

export default RegisterScreen;
