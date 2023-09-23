import React from 'react'
import {
  Input,
  Button,

} from "@material-tailwind/react";

import { Card, Typography } from "@material-tailwind/react";


import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUserUpdateMutation } from "../../features/auth/authApi";
import { updateUser } from "../../features/userSlice";
import { useGetOrderByUserQuery } from "../../features/order/order_api";
import { baseUrl } from "../../constants/constants";
// import { useGetAllUserQuery } from '../../features/auth/authApi';
import { useGetAllOrdersQuery } from '../../features/order/order_api';
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
const TABLE_HEAD = ["Name", "Qty", "Product", "Price"];

const AdminProfile = () => {
  const TABLE_HEAD = ["Name", "Qty", "Product", "Price"];
  const { user } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();
  const [userUpdate, { isLoading, isError }] = useUserUpdateMutation();


  const { isLoading: isLoad, isError: err, data } = useGetOrderByUserQuery(user.token);




  const valSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().min(5, 'too short').max(20, 'max character 20').required(),
    password: Yup.string().min(5, 'too short').max(20, 'max character 20').required()
  });
  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.fullname
    },
    onSubmit: async (val) => {
      try {
        const response = await userUpdate({
          body: {
            email: val.email,
            fullname: val.name
          },
          token: user.token
        }).unwrap();
        dispatch(updateUser({
          isAdmin: user.isAdmin,
          token: user.token,
          email: val.email,
          fullname: val.name,
          shippingAddress: user.shippingAddress
        }));
        toast.success('successfully updated');
      } catch (err) {
        toast.error(err.data.message);
      }

    },

  });

  return (
    <div className="grid grid-cols-3 p-7 gap-5">

      <Card color="transparent" shadow={false} className="max-w-mdmt-[7%] ">
        <Typography variant="h4" color="blue-gray">
          Admin Profile
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col gap-6 mt-5">
            <div>
              <Input
                name='name'
                id='name'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name && formik.touched.name ? true : false}
                size="lg" label="User Name" />
              {formik.errors.email && formik.touched.email ? <h1 className='mt-2 text-red-600'>{formik.errors.email}</h1> : null}
            </div>
            <div>
              <Input
                name='email'
                id='email'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email && formik.touched.email ? true : false}
                size="lg" label="Email Address" />
              {formik.errors.email && formik.touched.email ? <h1 className='mt-2 text-red-600'>{formik.errors.email}</h1> : null}
            </div>


          </div>
          {isLoading ? <button disabled className="ring-2 bg-black text-white px-10 py-[4px]">
            <div className='h-6 w-6 border-2  rounded-full border-t-gray-900 animate-spin'>
            </div>
          </button> :

            <Button type="submit" className="mt-6 bg-black" >
              Update
            </Button>}

        </form>
      </Card>



      <div className="col-span-2 px-12 space-y-4">
        <Typography variant="h4" color="blue-gray">
          Orders
        </Typography>






        {data && data.map((order) => {
          return <div key={order._id}>
            <h1>{order._id}</h1>


            <Card className=" h-full w-full">
              <table className="w-full table-auto text-left">

                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map(({ name, image, qty, price }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {qty}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            <img src={`${baseUrl}${image}`} className="h-[50px] w-[50px]" alt="" />
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography as="a" href="order/${order.id}" variant="small" className="font-medium">
                            {price}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>










          </div>
        })}



      </div>
    </div>
  )
}

export default AdminProfile
