import { useSelector } from "react-redux";
import Breadcrumb from "../../../Components/Vendor/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../Layout/VendorLayout";
import { useLocation } from "react-router-dom";
import VendorRootState from "../../../Redux/rootstate/VendorState";
import { useEffect, useState } from "react";
import { axiosInstanceVendor } from "../../../Api/axiosinstance";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

interface Review {
  username: string;
  rating: number;
  content: string;
}

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isActive: boolean;
  totalBooking: number;
  coverpic: string;
  logo: string;
  reviews: Review[] | undefined;
  logoUrl: string;
  coverpicUrl: string;
  about: string;
  isVerified: boolean;
  verificationRequest: boolean;
  OverallRating:number;
}

const Profile = () => {

  const vendorData = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [vendor, setVendor] = useState<Vendor>();




  useEffect(() => {
    if (id) {
      axiosInstanceVendor
        .get(`/getVendor?Id=${id}`, { withCredentials: true })
        .then((response) => {
          setVendor(response.data.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("here", error);
        });
    } else {
      axiosInstanceVendor
        .get(`/getVendor?Id=${vendorData?._id}`, { withCredentials: true })
        .then((response) => {
          setVendor(response.data.data);
        })
        .catch((error) => {
          console.log("here", error);
        });
    }
  }, [id, vendorData]);



  const handleVerification = async () => {
    axiosInstanceVendor
      .post(
        `/verification-request`,
        { vendorId: vendor?._id },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Verification Requested ..")
        console.log("requested..")
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  return (
    <DefaultLayout>
      
      <Breadcrumb pageName="Profile" folderName="" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20  md:h-1/2">
          <img
            src={vendor?.coverpicUrl ? vendor.coverpicUrl : '/img/defaultImage.jpg'}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          
          
          
          <div className="relative z-30 mx-auto -mt-16  w-full  rounded-full bg-black/20  backdrop-blur sm:h-44 sm:w-44 ">
            <div className="relative drop-shadow-2 w-44 h-44 overflow-hidden">
              <img
                src={vendor?.logoUrl ? vendor?.logoUrl : '/img/defaultImage.jpg'}
                alt="profile"
                className="w-full h-full  object-cover-full rounded-full"
              />
            </div>
          </div>

          <div className="relative z-30 mx-auto -mt-16  w-full mr-2 max-w-30 rounded-full  p-1 ">
            <div className="relative mt-4 pt-20">
              {!vendor?.isVerified && !vendor?.verificationRequest ? (
                <Button
                  onClick={handleVerification}
                  style={{ backgroundColor: "#FF2500" }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Request Verification
                </Button>
              ) : vendor?.verificationRequest ? (
                <Button
                  color="blue"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Verification Pending
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-10 ">
            
            <div className="flex justify-center">
              <div>
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {vendor?.name}
            </h3>
              </div>
              <div>
              {vendor?.isVerified ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                className=" h-10  w-10"
              >
                <polygon
                  fill="#42a5f5"
                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                ></polygon>
              </svg>
            ) : (
              ""
            )}
              </div>
            
            </div>
           

            <p className="font-bold mt-5 mb-5 ">{vendor?.city}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F] bg-gray-400">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {vendor?.totalBooking}
                </span>
                <span className="text-sm">Total Bookings</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {vendor?.OverallRating}
                </span>
                <span className="text-sm">Total Rating</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold " style={{color:'blue'}}>
                  {vendor?.isVerified  ? "Profile Verified" : "Profile not Verified"}
                </span>
                <span className="text-sm"></span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About
              </h4>
              <p className="mt-4.5 bg-gray-400">{vendor?.about}</p>
            </div>

           
            
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
