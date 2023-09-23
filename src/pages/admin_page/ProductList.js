import React from 'react'
import { useNavigate } from 'react-router'
import { useGetAllProductsQuery, useProductRemoveMutation } from '../../features/crud/crudApi';
import { Image, Shimmer } from 'react-shimmer'
import { baseUrl } from '../../constants/constants';
import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';

const ProductList = () => {
  const { user } = useSelector((store) => store.userInfo);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);


  const nav = useNavigate();
  const { isLoading, isError, error, data } = useGetAllProductsQuery();

  const [removeProduct] = useProductRemoveMutation();

  const remove = async (product) => {
    try {
      const reponse = await removeProduct({
        id: product._id,
        token: user.token,
        imagePath: product.product_image

      }).unwrap();


      handleOpen();
      toast.success('successfully remove');


    } catch (err) {
      toast.error(err.data.message);
    }
  }

  if (isLoading) {
    return <div className='h-[250px] w-[25%] mx-auto mt-[9%]'>
      <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_tmnc73b6.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>

  }


  return (

    <div >
      <div className='p-5'>   <h1 className='text-2xl tracking-wide   font-bold'>Products Lists</h1></div>

      {data && data.map((product) => {
        return <div key={product._id} className='p-10 grid grid-cols-3 '>
          <div className='col-span-2'>


            <div className='grid grid-cols-5 mt-9 gap-10 items-center '>
              <Image
                src={`${baseUrl}${product.product_image}`}
                fallback={<Shimmer height={100} width={150} duration={4} />}
              />
              <p>{product.product_name.substring(0, 10)}</p>
              <p>Rs.{product.product_price}</p>
              <p>{product.brand}</p>
              <div className='flex space-x-7'>
                <button onClick={() => nav(`/update/product/${product._id}`, { state: product })}><i className="fa-solid fa-pen-to-square fa-lg"></i></button>


                <Fragment>
                  <Button onClick={handleOpen} variant="gradient">
                    <i className="fa-solid fa-trash fa-lg"></i>
                  </Button>
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Hold ON</DialogHeader>
                    <DialogBody divider>
                      Are you sure you want to remove this product ?
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button variant="gradient" color="green" onClick={() => remove(product)}>
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </Fragment>




              </div>
            </div>


          </div>



        </div>
      })}



    </div>

  )
}

export default ProductList
