import React from 'react';
import {Formik} from 'formik';
import {Button, TextInput, View} from 'react-native';
import {authService} from '../../services/auth.service';
import {User} from '../../models';
import {navigationService} from '../../services/navigation.service';

function LoginScreen() {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = values => {
    console.log('login submit', values);
    authService.postLogin(values).subscribe(async res => {
      await authService.setAuth(new User(res.data));
      navigationService.navigate('Home');
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
        onSubmit(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={{padding: 10}}>
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
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
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
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Password"
            />
            {/* {formik.touched.password && Boolean(formik.errors.password) && (
          <Text style={{color: 'red'}}>{formik.errors.password}</Text>
        )} */}
          </View>

          <Button onPress={handleSubmit} title="Submit" />
          {/* </ScrollView> */}
        </View>
      )}
    </Formik>
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
