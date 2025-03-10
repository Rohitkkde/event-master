
import { CustomError } from "../Error/CustomError";
import Post,{PostDocument} from "../Model/Post";
import { createNewPost, deletePostById, findPostById, findPostsByVendorId } from '../Repository/postRepo';
import mongoose from "mongoose";



export const createPost=async(caption:string,imageName:string,vendor_id:string,imageUrl: string): Promise<object>=>{
    try{
      const vendorIdObjectId =new mongoose.Types.ObjectId(vendor_id) as unknown as mongoose.Schema.Types.ObjectId;
      const add= await createNewPost({caption , image:imageName, vendor_id:vendorIdObjectId , imageUrl});
      return {post:add};
    } catch (error) {
      console.error("Error processing create Post", error);
      throw new CustomError("unable to create a post now , try after some time" , 400);
    }
  }

export const getAllPosts=async(vendor_id:string):Promise<PostDocument[]>=>{
  try{
    const posts=await findPostsByVendorId(vendor_id)
    return posts;
  } catch (error) {
    console.error("Error fetching get All Posts from DB", error);
    throw new CustomError("unable to get posts now , try after some time" , 400);
  }
}


export const getPostById=async(_id:string):Promise<PostDocument| null>=>{
  try{
    const post=await findPostById(_id)
    return post;
  } catch (error) {
    console.error("Error fetching get Post By Id from DB", error);
    throw new CustomError("unable to get posts now , try after some time" , 400);
  }
}


export const deletePost=async(_id:string):Promise<PostDocument| null>=>{
  try{
    const post=await deletePostById(_id)
    return post;
  } catch (error) {
      console.error("Error processing delete Post", error);
      throw new CustomError("unable to delete posts now , try after some time" , 400);
  }
}