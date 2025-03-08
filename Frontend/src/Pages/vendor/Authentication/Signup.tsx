'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
    Button,
    Select,
    Option
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { axiosInstanceVendor } from "../../../Api/axiosinstance";
import { toast } from "react-toastify";
import { validate } from "../../../Validations/vendor/registerVal";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";


interface VendorType {
  _id: string;
  type:string;
  status:boolean;
}

interface VendorFormValues {
  name: string;
  email: string;
  password: string;
  Confirmpassword:string;
  city: string;
  phone: string;
}

const initialValues: VendorFormValues = {
  name: "",
  email: "",
  password: "",
  Confirmpassword:"",
  city: "",
  phone: "",
};



const VendorSignupForm = () => {
  

  const [vendorTypes, setvendorTypes] = useState<VendorType[]>([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<VendorFormValues>({

  name: "",
  email: "",
  password: "",
  Confirmpassword:"",
  city: "",
  phone: ""
  });
  const [vendor_type, setVendorType] = useState<string>("");
  const [vendorTypeError,setVendorTypeError]=useState("")



  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };
  



  useEffect(() => {
    axiosInstanceVendor
      .get("/vendor-types")
      .then((response) => {
        setvendorTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);




  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if(vendor_type.length==0){
      setVendorTypeError("Choose Type")
      return
    }
    if (Object.values(errors).every((error) => error === "")) {
      setIsLoading(true);
      axiosInstanceVendor
        .post("/signup", {...formValues , vendor_type}, { withCredentials: true })
        .then((response) => {
         
          if (response.data.email) {
            toast.success(response.data.message);
            navigate("/vendor/verify");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("here", error);
          setIsLoading(false);
        });
    }
  };



  return (
    <div>
      {isLoading ?(<LoadingSpinner/>) : (
        <>
         <div className="w-full h-screen flex flex-col md:flex-row items-start">
         <div className="w-full md:w-1/2 h-full object-cover " style={{backgroundImage:`url('/imgs/dj.jpg')`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backdropFilter:"revert-layer", minHeight: '300px', maxHeight: '800px'}}>
          
         </div>
         <div className="w-full md:w-1/2 mt-10 md:mt-0">
    <Card
      className="w-96 border-4 border-gray-500 bg-dark lg:mt-10 bg-dark mx-auto max-w-md bg-white rounded-lg shadow-lg"
      placeholder={undefined}
      shadow={false}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"
        placeholder={undefined}
      >
        <Typography variant="h4" color="black" placeholder={undefined}>
          Vendor - Sign Up
        </Typography>
      </CardHeader>
      <form onSubmit={submitHandler}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Input
            label="Name"
            onChange={handleChange}
            value={formValues.name}
            name="name"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.name ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.name}
            </p>
          ) : null}

          <Select
            label="Vendor Type"
            size="md"
            onChange={(e)=>{
              setVendorType(e!);
              setVendorTypeError("")
            }}
            value={vendor_type}
            name="vendor_type"
            color="pink"
            className="bg-white bg-opacity-50"
            placeholder={undefined}
            key={vendor_type}
          >
            {vendorTypes.map((val, index) => 
            val.status?(
              <Option value={val.type} key={index}>
                {val.type}
              </Option>
            ):'')}
          </Select>


          {vendorTypeError ? (
                <p
                  className="text-sm"
                  style={{ color: "red", marginBottom: -10, marginTop: -10 }}
                >
                  {vendorTypeError}
                </p>
              ) : null}
          <Input
            label="City"
            onChange={handleChange}
            value={formValues.city}
            name="city"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.city ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.city}
            </p>
          ) : null}
          <Input
            label="Email"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.email ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.email}
            </p>
          ) : null}
          <Input
            label="Mobile"
            onChange={handleChange}
            value={formValues.phone}
            name="phone"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.phone ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.phone}
            </p>
          ) : null}
        
          <Input
            label="Password"
            type="password"
            size="md"
            onChange={handleChange}
            value={formValues.password}
            name="password"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.password}
            </p>
          ) : null}

          <Input
            label="Confirm Password"
            type="password"
            size="md"
            onChange={handleChange}
            value={formValues.Confirmpassword}
            name="Confirmpassword"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.Confirmpassword ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.Confirmpassword}
            </p>
          ) : null}


          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            type="submit"
          >
            Sign Up
          </Button>
        </CardBody>
      </form>
      <CardFooter className="pt-0" placeholder={undefined}>
        <Typography
          variant="small"
          className="mt-6 flex justify-center"
          color="black"
          placeholder={undefined}
        >
          Already have an account?
          <Link to="/vendor/login">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="black"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Login
            </Typography>
          </Link>
        </Typography>
        <Typography
          variant="small"
          className="mt-3 flex justify-center"
          color="black"
          placeholder={undefined}
        >
          Are you a user?
          <Link to="/signup">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="black"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Signup here
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
    </div>
        </div>
        </>
      )}
    </div>
  );
};

export default VendorSignupForm;