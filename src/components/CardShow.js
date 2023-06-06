import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Image, Shimmer } from 'react-shimmer'
import { useNavigate } from 'react-router';
import { baseUrl } from '../constants/constants';

const CardShow = ({ product }) => {
  const nav = useNavigate();
  const total = product.reviews.reduce((acc, item) => acc + item.rating, 0);


  const avgRating = total / product.reviews.length;
  let icons = [];
  for (let i = 1; i <= avgRating; i++) {
    icons.push('fa-regular fa-star');
  }

  return (
    <Card onClick={() => nav(`/product/${product._id}`)} className="w-full max-w-[26rem] shadow-lg cursor-pointer">
      <CardHeader floated={false} color="blue-gray">
        <Image
          src={`${baseUrl}${product.product_image}`}
          fallback={<Shimmer height={200} width={400} duration={4} />}
        />


      </CardHeader>
      <CardBody className='space-y-4'>
        <div className=" flex items-center justify-between">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            {product.product_name}
          </Typography>
        </div>
        <div color="gray" className="space-x-4 flex justify-between">
          <div className='text-amber-400'>
            {product.reviews.length > 0 ? icons.map((ic, i) => {
              return <i className={ic} key={i}></i>
            }) : 'No Reviews yet'}
          </div>
          <span>{product.numReviews} reviews</span>
        </div>

        <Typography color="gray">
          {product.product_detail.substring(0, 20) + '....'}
        </Typography>

      </CardBody>

    </Card>
  )
}

export default CardShow
