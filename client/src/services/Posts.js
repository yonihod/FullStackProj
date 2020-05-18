import axios from 'axios';

export default class PostsService {
    static POSTS_API = `${process.env.REACT_APP_API_URL}/posts`;

    static getPosts(filter) {
        return axios.get(this.POSTS_API, { params : {filter:filter }})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getPost(postId) {
        return axios.get(`${this.POSTS_API}/${postId}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static AddPost(post) {
        return axios.post(this.POSTS_API, post)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static EditPost(postId, post) {
        return axios.put(`${this.POSTS_API}/${postId}`, post)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static DeletePost(postId) {
        return axios.delete(`${this.POSTS_API}/${postId}`, postId)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static ApplyTask(postId, userId) {
        return axios.put(`${this.POSTS_API}/apply`, { postId, userId })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error)
        });
    }

    static CancelApplication(postId, userId) {
        return axios.put(`${this.POSTS_API}/cancel`, { postId, userId })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error)
        });
    }
}