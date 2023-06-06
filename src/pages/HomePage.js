import React from 'react'

import CardShow from '../components/CardShow';
import { useGetAllProductsQuery } from '../features/crud/crudApi';

const HomePage = () => {
  const { isLoading, isError, error, data } = useGetAllProductsQuery();




  if (isLoading) {
    return <div className='h-[250px] w-[25%] mx-auto mt-[9%]'>
      <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_tmnc73b6.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>

  }


  return (
    <div className='grid grid-cols-4 p-5'>
      {data && data.map((product) => {
        return <CardShow key={product._id} product={product} />
      })}

    </div>
  )
}

export default HomePage
