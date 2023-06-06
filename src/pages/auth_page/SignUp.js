import React from 'react'
import { Card, Input, Button, Typography, } from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useUserSignUpMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';



const SignUp = () => {

  const [registerUser, { isLoading }] = useUserSignUpMutation();
  const nav = useNavigate();
  const valSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    email: Yup.string().min(5, 'too short').max(30, 'max character 20').required(),
    password: Yup.string().min(5, 'too short').max(20, 'max character 20').required()
  });
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await registerUser(val).unwrap();
        nav(-1);
        toast.success('successfully register');
        console.log(response);
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }


    },
    validationSchema: valSchema
  });

  return (
    <div className='max-w-sm mt-16  mx-auto '>
      <div>
        <Card className='place-self-center' color="transparent" shadow={false} >
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form onSubmit={formik.handleSubmit} className="mt-8 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col  space-y-4">

              <div>
                <Input
                  name='fullname'
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  size="lg" label="Name" />
                {formik.errors.fullname && formik.touched.fullname ? <h1 className='mt-1 text-red-600'>{formik.errors.fullname}</h1> : null}
              </div>

              <div>
                <Input
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  size="lg" label="Email" />
                {formik.errors.email && formik.touched.email ? <h1 className='mt-1 text-red-600'>{formik.errors.email}</h1> : null}
              </div>
              <div>
                <Input
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password" size="lg" label="Password" />
                {formik.errors.email && formik.touched.email ? <h1 className='mt-1 text-red-600'>{formik.errors.email}</h1> : null}
              </div>


            </div>

            {isLoading ? <Button disabled className="mt-6 relative py-2 flex justify-center" fullWidth>
              <div className='h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin'>
              </div>
            </Button> : <Button type='submit' className="mt-6" fullWidth>
              Register
            </Button>}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <button type='button' onClick={() => nav(-1)} className='ml-2 text-blue-900 font-bold'>Login</button>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default SignUp