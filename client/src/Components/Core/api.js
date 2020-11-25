import axios from 'axios';
import { NEWS_API_KEY } from "./config";

const instance =
    axios.create({ baseURL: `http://newsapi.org/v2` });

async function getByCategory(category) {
    const response = await (await instance.get(`/top-headlines?apiKey=${NEWS_API_KEY}&category=${category}&sortBy=publishedAt&country=us`)).data.articles;
    return response;
}

const instancePosts = axios.create({ baseURL: `http://localhost:3030` });

async function createPost(post) {
    await instancePosts.post(`/liveNews`, post);
}
async function getPosts() {
    return await instancePosts.get(`/liveNews`);
}

async function getPost(id) {
    return (await instancePosts.get(`/liveNews/${id}`)).data;
}

async function updatePost(post) {
    await instancePosts.patch(`/liveNews/${post.title}`, post);
}

async function deletePost(title) {
    console.log(title);
    await instancePosts.delete(`/liveNews/${title}`).data;
}

async function register(loginPayload) {
    
    let mydata = null;

    await instancePosts.post(`/user/register`,loginPayload).then(response =>
    {
        mydata = response;
    });

    return mydata;
}

async function login(loginPayload) {

    let mydata = null;
    
    await instancePosts.post(`/user/login`,loginPayload).then(response=>
    {
        mydata = response;
    });

    return mydata;
}

export default {
    getByCategory,
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    register,
    login
};
