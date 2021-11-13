import React from 'react';
import {useFormik} from 'formik';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {authService} from '../../services/auth.service';
import {signInValidation} from './validation';
import {User} from '../../models';
import {navigationService} from '../../services/navigation.service';

function LoginScreen() {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = values => {
    console.log('login submit');
    authService.postLogin(values).subscribe(async res => {
      await authService.setAuth(new User(res.data));
      navigationService.navigate('Home');
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: signInValidation,
    onSubmit: onSubmit,
  });

  return (
    <View>
      {/* <ScrollView> */}
      <View>
        <TextInput
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 10,
          }}
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          placeholder="Email"
        />
        {/* {formik.touched.email && Boolean(formik.errors.email) && (
          <Text style={{color: 'red'}}>{formik.errors.email}</Text>
        )} */}
      </View>
      <View>
        <TextInput
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 10,
          }}
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          placeholder="Password"
        />
        {/* {formik.touched.password && Boolean(formik.errors.password) && (
          <Text style={{color: 'red'}}>{formik.errors.password}</Text>
        )} */}
      </View>

      <Button onPress={formik.handleSubmit} title="Submit" />
      {/* </ScrollView> */}
    </View>
  );
}

// const FormControl = styled(View)``;

// const Error = styled(Text)`
//   color: 'red';
// `;

// const Input = styled(TextInput)`
//   backgrou: 'white';
//   color: 'black';
// `;

export default LoginScreen;
