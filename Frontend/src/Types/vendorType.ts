import { Review } from "./reviewType";

export interface VendorData{
    _id:string;
    email : string;
    password : string;
    name:string;
    city:string;
    about:string;
    phone:number;
    isVerified:boolean;
    verificationRequest:boolean;
    totalBooking:number;
    vendor_type:string;
    isActive:boolean;
    coverpicUrl:string;
    logoUrl:string;
    bookedDates:Array<string>;
    OverallRating:number;
    notifications:Array<object>;
    locks:Array<object>;
    reviews:Array<Review>
}

export interface Post {
    imageUrl: string;
    _id: string;
    caption: string;
  }