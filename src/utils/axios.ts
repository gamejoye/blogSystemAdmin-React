import axios from "axios";
import { BASE_URL } from "../contants";
import { IBlog, ITalk, IUserInfo } from "../types";
const options = {
    timeout: 5000,
    baseURL: BASE_URL,
    withCredentials: true,
}
const getInstance = axios.create(options);
const postInstance = axios.create(options);
const putInstance = axios.create(options);
const deleteInstance = axios.create(options);


export interface IAuthenticationResult {
    code: 200 | 401;
    userInfo: IUserInfo;
    token: string
}

/* 
 * 验证用户
 * 成功 => 返回 200状态码、用户信息、新的token
 * 失败 => 返回 401状态码
*/
const authenticateUser = (user: {
    name: string;
    password: string
}) => {
    return postInstance.post('user/authentication', user)
}

const getUserInfo = (token: string) => {
    return getInstance.get(`user/introduction/${token}`)
};

const updateUserInfo = (data: IUserInfo) => {
    return putInstance.put(`user/introduction/${data.name}`, data);
}

const getAllBlogs = (name: string) => {
    return getInstance.get(`blog/name/${name}`);
}

const postBlog = (formData: FormData, blog: IBlog) => {
    return postInstance.post('files/images', formData)
        .then(res => res.data)
        .then(content => {
            return postInstance.post('blog', { ...blog, content });
        });
}

const deleteBlog = (blogId: number) => {
    return deleteInstance.delete(`blog/${blogId}`);
}

const getAllComments = (blogId: number) => {
    return getInstance.get(`blog/${blogId}/comment/all`);
}

const deleteComment = (blogId: number, commentId: number) => {
    return deleteInstance.delete(`blog/${blogId}/comment/${commentId}`);
}

const getAllTalks = (name: string) => {
    return getInstance.get(`dynamic/${name}/talk/all`);
}

const deleteTalk = (talk: ITalk) => {
    return deleteInstance.delete(`dynamic/${talk.userInfo.name}/talk/${talk.id}`);
}

const postTalk = (talk: ITalk) => {
    return postInstance.post(`dynamic/${talk.userInfo.name}/talk`, talk);
}

const getAllEssays = (name: string) => {
    return getInstance.get(`dynamic/${name}/essay/all`);
}

export {
    authenticateUser
}

export {
    getUserInfo,
    updateUserInfo
}

export {
    getAllBlogs,
    deleteBlog,
    postBlog
}

export {
    getAllComments,
    deleteComment
}

export {
    getAllTalks,
    deleteTalk,
    postTalk
}

export {
    getAllEssays
}