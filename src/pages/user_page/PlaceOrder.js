import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Image, Shimmer } from 'react-shimmer'
import { baseUrl } from '../../constants/constants';
import { useOrderAddMutation } from '../../features/order/order_api';
import { toast } from 'react-toastify';
import { clearCarts } from '../../features/userSlice';

// placeOrder

const PlaceOrder = () => {
  const { user, carts } = useSelector((store) => store.userInfo);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [addOrder, { isLoading }] = useOrderAddMutation();
  const total = carts.reduce((acc, item) => acc + item.price * item.qty, 0);


  const addNewOrder = async (data) => {
    try {
      const response = await addOrder({
        body: data,
        token: user.token
      }).unwrap();
      dispatch(clearCarts());
      nav('/', { replace: true })
      toast.success('succesfully added');
    } catch (err) {
      toast.error(err.data.message);

    }
  }

  return (
    <div className='grid grid-cols-3 px-5 justify-items-center mt-[2%] items-center'>
      <div className='col-span-2 space-y-3'>
        <div className='border-b-2 border-b-gray-400 border-spacing-2'>
          <h1 className='text-Xl text-gray-700 font-bold'>SHIPPING ADDRESS</h1>
          <p>{user.shippingAddress.address}, {user.shippingAddress.city}</p>
        </div>

        <div className='space-y-4'>

          <h1 className='text-Xl text-gray-700 font-bold'>ORDER ITEMS</h1>



          {carts.map((cart) => {
            return <div key={cart.product} className='grid grid-cols-5 gap-4 items-center'>
              <Image
                src={`${baseUrl}${cart.image}`}
                fallback={<Shimmer height={100} width={150} duration={4} />}
              />
              <h1>{cart.name}</h1>
              <p className='col-span-2'>{cart.qty} x Rs.{cart.price} = Rs.{cart.qty * cart.price}</p>
            </div>
          })}




        </div>




      </div>

      <div className='border-1 border-gray-700  space-y-3 '>
        <h1 className='text-xl text-gray-600 font-semibold'>ORDER SUMMARY</h1>
        <p>Total Rs.{total}</p>


        {isLoading ? <button disabled className="ring-2 bg-black text-white px-10 py-[4px]">
          <div className='h-6 w-6 border-2  rounded-full border-t-gray-900 animate-spin'>
          </div>
        </button> :
          <button onClick={() => {
            addNewOrder({
              orderItems: carts,
              totalPrice: total,
            });
          }
          } className='ring-2 bg-black text-white px-3 py-[5px]'>Place  Order</button>}
      </div>

    </div>
  )
}

export default PlaceOrder
