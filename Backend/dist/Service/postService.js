"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const CustomError_1 = require("../Error/CustomError");
const postRepo_1 = require("../Repository/postRepo");
const mongoose_1 = __importDefault(require("mongoose"));
const createPost = (caption, imageName, vendor_id, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendorIdObjectId = new mongoose_1.default.Types.ObjectId(vendor_id);
        const add = yield (0, postRepo_1.createNewPost)({ caption, image: imageName, vendor_id: vendorIdObjectId, imageUrl });
        return { post: add };
    }
    catch (error) {
        console.error("Error processing create Post", error);
        throw new CustomError_1.CustomError("unable to create a post now , try after some time", 400);
    }
});
exports.createPost = createPost;
const getAllPosts = (vendor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, postRepo_1.findPostsByVendorId)(vendor_id);
        return posts;
    }
    catch (error) {
        console.error("Error fetching get All Posts from DB", error);
        throw new CustomError_1.CustomError("unable to get posts now , try after some time", 400);
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, postRepo_1.findPostById)(_id);
        return post;
    }
    catch (error) {
        console.error("Error fetching get Post By Id from DB", error);
        throw new CustomError_1.CustomError("unable to get posts now , try after some time", 400);
    }
});
exports.getPostById = getPostById;
const deletePost = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, postRepo_1.deletePostById)(_id);
        return post;
    }
    catch (error) {
        console.error("Error processing delete Post", error);
        throw new CustomError_1.CustomError("unable to delete posts now , try after some time", 400);
    }
});
exports.deletePost = deletePost;
