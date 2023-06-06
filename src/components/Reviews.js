import React from 'react'
import { Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useProductReviewMutation } from '../features/crud/crudApi';
import { toast } from 'react-toastify';


const Reviews = ({ id }) => {
  const { user } = useSelector((store) => store.userInfo);
  const [addReview, { isLoading }] = useProductReviewMutation();

  const formik = useFormik({
    initialValues: {
      rating: '',
      comment: ''
    },
    onSubmit: async (val, { resetForm }) => {
      try {

        const response = await addReview({
          id,
          body: {
            rating: val.rating,
            comment: val.comment,
            username: user.fullname
          },
          token: user.token
        }).unwrap();
        toast.success('succesfully added review');
      } catch (err) {
        toast.error(err.data.message);
      }

      resetForm();
    }
  });

  return (
    <div className='p-4 space-y-7 py-11'>

      <form onSubmit={formik.handleSubmit} >
        <div className='pl-4 space-y-5'>
          <h1>WRITE A CUSTOMER REVIEW</h1>
          <div className="w-44 space-y-2">
            <p>Rating</p>
            <Select
              onChange={(e) => formik.setFieldValue('rating', e)}
              label="Select" name='rating'>
              <Option value='1'>Poor</Option>
              <Option value='2'>Fair</Option>
              <Option value='3'>Good</Option>
              <Option value='4'>Very Good</Option>
              <Option value='5'>Excellent</Option>
            </Select>


          </div>

          <h2>Comment</h2>


          <div className="w-96 space-y-5">
            <Textarea
              name='comment'
              id='comment'
              value={formik.values.comment}
              onChange={formik.handleChange}
              label="Message" />

            {isLoading ? <button disabled className="ring-2 bg-black text-white px-10 py-[4px]">
              <div className='h-6 w-6 border-2  rounded-full border-t-gray-900 animate-spin'>
              </div>
            </button> : <button type='submit' className='text-center bg-black text-white py-1 px-4 rounded'>Submit</button>}
          </div>



        </div>

      </form>

    </div>
  )
}

export default Reviews