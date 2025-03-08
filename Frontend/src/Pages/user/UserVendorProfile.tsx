 import {
    Avatar,
    Typography,
    Button,
    IconButton,
  } from '@material-tailwind/react';
  import {
    MapPinIcon,
  } from '@heroicons/react/24/solid';
import Footer from '../../Components/Home/Footer';
  import {  useLocation } from 'react-router-dom';
  import { useEffect, useState ,useRef } from 'react';
  import { axiosInstance } from '../../Api/axiosinstance';
  import VendorTabs from '../../Components/Vendor/Profile/VendorTabs';
  import { toast } from 'react-toastify'
  import UserRootState from '../../Redux/rootstate/UserState';
  import { useSelector } from 'react-redux';
  import {Review} from '../../Components/Vendor/Profile/Review';
  import ProfileButtons from '../../Components/Vendor/ProfileButtons';
  import { useDispatch } from 'react-redux';
  import { setUserInfo } from '../../Redux/slices/UserSlice';
  import { setVendorInfo } from '../../Redux/slices/VendorSlice';
  import { VendorData } from '../../Types/vendorType';


  interface Review {
    _id:string;
    date:Date;
    reply:Array<string>;
    username: string;
    rating: number;
    content: string;
  }
  

  
  export function UserVendorProfile() {
    
    const user = useSelector((state: UserRootState) => state.user.userdata);
    const topRef = useRef<HTMLDivElement | null>(null);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id :string= queryParams.get('vid') as string;


    const [vendor, setVendor] = useState<VendorData>();
    const [favourite,setFavourite]=useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
     
      if (user?.favorite.includes(id)) { 
        setFavourite(true);
        }else{
          setFavourite(false);
        }
    
      axiosInstance
        .get(`/getVendor?Id=${id}`, { withCredentials: true })
        .then((response) => {
          setVendor(response.data.data);
        })
        .catch((error) => {
          console.log('here', error);
        });
    }, [user]);
  
    useEffect(() => {
      
      if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, []);


  const bookedDates = vendor?.bookedDates;


    const handleFavourite=async()=>{
      try {

          if(!user){
            toast.error("Please login first!")
            return;
          }
        axiosInstance
        .post(`/add-Favorite-Vendor?vendorId=${id}&userId=${user?._id}`, { withCredentials: true })
        .then((response) => {
          dispatch(setUserInfo(response.data.data.userData))
          dispatch(setVendorInfo(response.data.data.vendordata))
         
          
          if (response.data.data.isFavorite) {
            toast.success("Vendor added to favorites.");
        } else {
            toast.success("Vendor removed from favorites.");
        }
        })
        .catch((error) => {
          console.log('here', error);
          toast.error(error.response.data.message)
        });
      } catch (error) {
       console.log(error)
      }
    }
  

    
    return (
      <>
      
      <section className="relative block h-[80vh] lg:h-[100vh] overflow-hidden" ref={topRef}>
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url(${vendor?.coverpicUrl})` }} />
        <div className="absolute top-0 h-full w-full bg-black/30 bg-cover" />
      </section>

        <section className="relative bg-white">
          <div className="relative -mt-40 flex w-full  min-w-0 flex-col break-words bg-white">
           
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="relative flex gap-6 items-start">
                 <div className="flex justify-center lg:justify-start lg:ml-20 lg:-mt-20 xsm:ml-10 ml-5 -mt-10">
                      <Avatar
                        src={vendor?.logoUrl}
                        alt="LOGO"
                        variant="circular"
                        className="h-26 w-26 sm:h-20 sm:w-30 lg:h-40 lg:w-40"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </div>

                  <div className="flex flex-col mt-2">
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {vendor?.name}

                    </Typography>
                   
                    <Typography
                      variant="paragraph"
                      color="black"
                      className="!mt-0"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {vendor?.email}
                    </Typography>

                    {vendor?.isVerified ? (
             <svg
             xmlns="http://www.w3.org/2000/svg"
             x="0px"
             y="0px"
             width="48"
             height="48"
             viewBox="0 0 48 48"
             className="absolute top-2 right-2 h-7 w-7"
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
            ): (
              <Typography
                      variant="paragraph"
                      color="blue"
                      className="!mt-0 font-bold"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                    Profile Not Verified
                    </Typography>
            )}
                  </div>
                </div>
  
                <div className="mt-10 mb-10 flex lg:flex-col md:flex-row flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <div className='flex gap-2'>

             
              <IconButton
              
               style={favourite ?{  backgroundColor: 'red'} :{  backgroundColor: 'black'}}
              
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={handleFavourite}
                  >
                    <i className="fas fa-heart w-fit lg:ml-auto" />
                </IconButton>

             

                  <Button
                  style={{background:'green'}}
                    className="w-fit lg:ml-auto"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="green"
                  >
                    {vendor?.OverallRating.toFixed(1)}
                  </Button>

              
                </div>


                <ProfileButtons vendorId={vendor?._id} bookedDates={bookedDates} userId={user?._id}/>
                
              </div>


              </div>


              <div className="-mt-4 lg:pl-20 container space-y-2">
                <div className="flex items-center gap-2 mx-5">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography
                    className="font-medium text-blue-gray-500"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor?.city}
                  </Typography>
                </div>
              
              </div>


              <div className="mb-10 py-6 lg:pl-20 mx-5">
                <div className="flex w-full flex-col items-start lg:w-1/2">
                  <Typography
                    className="mb-6 font-normal text-blue-gray-500"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor?.about}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section>
        <VendorTabs reviews={vendor?.reviews ?? []} />
        </section>

        <section className='mb-20'>
        <Review/>
       </section>

        <div className="bg-white">
          <Footer />
        </div>
      </>
    );
  }
  
  export default UserVendorProfile;