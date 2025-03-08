
import {
  Avatar,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
 
 } from "@material-tailwind/react";
 
 
 import { useEffect, useState } from "react";
 import { axiosInstanceVendor } from "../../../Api/axiosinstance";
 import { VendorData } from "../../../Types/vendorType";
 
 
 interface DialogWithImageProps {
     imageUrl: string;
     open: boolean;
     handler: () => void;
     vendorid:string
    }

 
 export function DialogWithImage({ imageUrl, open, handler , vendorid }:DialogWithImageProps) {
  
   const [vendor , setVendor] = useState<VendorData>();
 
 
   useEffect(()=>{
     axiosInstanceVendor.get(`/getVendor?Id=${vendorid}` , {withCredentials:true}).then((res)=>{
       setVendor(res.data.data)
     })
   },[])

 return (
    <Dialog size="sm" open={open} handler={handler}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <DialogHeader className="justify-between"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="flex items-center gap-3">
            <Avatar
                     size="sm"
                     variant="circular"
                     alt="tania andrew"
                     src={imageUrl} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            />
            <div className="-mt-px flex flex-col">
              <Typography
                         variant="small"
                         color="blue-gray"
                         className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {vendor?.name}
              </Typography>
              <Typography
                         variant="small"
                         color="gray"
                         className="text-xs font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {vendor?.email}
              </Typography>
            </div>
          </div>
        
        </DialogHeader>
      <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <img
          alt="nature"
          className="h-[30rem] w-full rounded-lg object-cover object-center"
          src={imageUrl}
        />
      </DialogBody>
      <DialogFooter className="justify-between" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} children={undefined}>
         
        </DialogFooter>
    </Dialog>
 );
}
