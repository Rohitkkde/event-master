import {
  Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";


   
 
interface VendorCardProps {
  name: string;
  email: string;
  phone: number;
  city: string;
  _id:string;
  coverpicUrl:string;
  OverallRating:number;
}


const VendorCard:React.FC<VendorCardProps> =({name,city,coverpicUrl,OverallRating})=> {
  const roundedOverallRating = OverallRating.toFixed(1);


  return (
    <Card className="lg:w-full max-w-[20rem] shadow-lg border-2 border-gray-600 "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <img
          src={coverpicUrl}
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
       
      </CardHeader>
      <CardBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {name}
          </Typography>
          <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
           {roundedOverallRating}
          </Typography>
        </div>
        <Typography color="gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {city}
        </Typography>
      </CardBody>
      <CardFooter className="pt-3 -mt-5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        
    
        <Button size="md" fullWidth={true}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  className="bg-black hover:bg-red-500 text-white font-bold = rounded">
          View Profile
        </Button>

      </CardFooter>
    </Card>

   
  );

};


export default VendorCard