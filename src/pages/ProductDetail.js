import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { Image, Shimmer } from 'react-shimmer'
import { useFormik } from 'formik';
import Reviews from '../components/Reviews';
import { useGetProductByIdQuery } from '../features/crud/crudApi';
import { baseUrl } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { setCart } from '../features/userSlice';


const ProductDetail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, error, data } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      select: 1
    },

  });


  if (isLoading) {
    return <div className='h-[250px] w-[25%] mx-auto mt-[9%]'>
      <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_tmnc73b6.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>

  }



  const total = data.reviews.reduce((acc, item) => acc + item.rating, 0);

  const avgRating = total / data.reviews.length;
  let icons = [];
  for (let i = 1; i <= avgRating; i++) {
    icons.push('fa-regular fa-star');
  }

  const addToCarts = (cart) => {
    dispatch(setCart(cart));
  }

  return (
    <>
      <div className='grid grid-cols-3 px-5 py-7 gap-10'>
        <div>
          <Image
            src={`${baseUrl}${data.product_image}`}
            fallback={<Shimmer height={300} width={400} duration={4} />}
          />

        </div>

        <div className='space-y-7 '>
          <h1 className='text-gray-700 font-bold text-2xl'>{data.product_name.toUpperCase()}</h1>
          <div className='border-t-2 border-gray-200 border-b-2 py-1'>
            {icons.map((ic, i) => {
              return <i key={i} className={ic}></i>
            })}
            <p className='font-semibold text-gray-500'>{data.numReviews < 1 ? 'No Reviews yet' : `${data.numReviews} reviews`}</p>
          </div>
          <p className='border-t-2 border-gray-200 border-b-2 py-1 font-semibold text-gray-500'>Price Rs. {data?.product_price}</p>
          <p className='font-bold text-gray-700'>{data.product_detail}</p>
        </div>


        <table className='border-collapse border-2 border-slate-700  text-center max-w-xs '>
          <tbody>
            <tr>
              <td className='border-2 border-slate-700'>Price</td>
              <td className='border-2 border-slate-700'>{data.product_price}</td>
            </tr>

            <tr>
              <td className='border-2 border-slate-700'>Status</td>
              <td className='border-2 border-slate-700'>{data.countInStock === 0 ? 'Out of Stock' : 'In Stock'}</td>
            </tr>


            {data.countInStock > 0 && <tr>
              <td className="border  text-center ">Qty</td>
              <td className="border  text-center">
                <select onChange={(e) => formik.setFieldValue('select', e.target.value)} name="select" id="select" className='w-14 px-4 py-1'>
                  {[...Array(data.countInStock).keys()].map((x) => {
                    return <option value={x + 1} key={x}>{x + 1}</option>
                  })}

                </select>

              </td>

            </tr>}

            <tr >
              <td colSpan={2}>
                {data.countInStock === 0 ? <button disabled className='bg-gray-600 w-[70%] text-white py-2 px-2'>Add To Cart</button> : <button
                  onClick={() => {
                    addToCarts({
                      name: data.product_name,
                      qty: formik.values.select,
                      image: data.product_image,
                      totalPrice: data.product_price * formik.values.select,
                      price: data.product_price,
                      product: data._id,
                      stock: data.countInStock
                    });
                    nav('/cart');
                  }
                  }
                  className='bg-black w-[70%] text-white py-2 px-2'>Add To Cart</button>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='px-7'>
        <h1 className='mb-4'>REVIEWS</h1>
        <div>
          {data.reviews.map((r) => {
            return <div key={r._id} className='space-y-2'>
              {[...Array(r.rating).keys()].map((x) => {
                return <i key={x} className="fa-solid fa-star"></i>
              })}
              <h1>{r.username}</h1>
              <p>{r.comment}</p>

            </div>
          })}
        </div>
      </div>

      <Reviews id={id} />
    </>
  )
}

export default ProductDetail
