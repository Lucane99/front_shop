import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useUserUpdateMutation } from "../../features/auth/authApi";
import { updateUser } from "../../features/userSlice";

const Shipping = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userInfo);
  const [userUpdate, { isLoading, isError }] = useUserUpdateMutation();


  const valSchema = Yup.object().shape({
    address: Yup.string().required(),
    city: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      city: '',
      isEmpty: false
    },
    onSubmit: async (val) => {
      try {
        const response = await userUpdate({
          body: {
            shippingAddress: val
          },
          token: user.token
        }).unwrap();
        dispatch(updateUser({
          isAdmin: user.isAdmin,
          token: user.token,
          email: user.email,
          shippingAddress: val
        }));
        nav('/user/placeorder', { replace: true });
        toast.success('successfully updated');
      } catch (err) {
        toast.error(err.data.message);
      }


    },
    validationSchema: valSchema

  });




  return (
    <Card color="transparent" shadow={false} className="max-w-md mx-auto mt-[7%]">
      <Typography variant="h4" color="blue-gray">
        Shipping Address
      </Typography>
      <Typography color="gray" className="my-2 font-normal">
        Enter your shipping details.
      </Typography>
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            size="lg" label="Address" />
          <Input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            size="lg" label="City" />
        </div>

        {isLoading ? <Button disabled className="mt-6 relative py-2 flex justify-center" fullWidth>
          <div className='h-7 w-7 border-2  rounded-full border-t-gray-900 animate-spin'>
          </div>
        </Button> : <Button type="submit" className="mt-6" fullWidth>
          Submit
        </Button>}

      </form>
    </Card>
  );
}


export default Shipping