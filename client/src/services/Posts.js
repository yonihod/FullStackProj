import axios from 'axios';

export default class PostsService {
    static POSTS_API = `${process.env.REACT_APP_API_URL}/posts`;

    static getPosts(filter) {
        return axios.get(this.POSTS_API, {params: {filter: filter}})
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

    static setViews(postId){
            return axios.put(`${this.POSTS_API}/${postId}`)
                .then((response) => {
                    return response.data.views + 1 ;
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
        return axios.put(`${this.POSTS_API}/apply`, {postId, userId})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static CancelApplication(postId, userId) {
        return axios.put(`${this.POSTS_API}/cancel`, {postId, userId})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static AssignApplicant(postId, userId) {
        return axios.put(`${this.POSTS_API}/assign`, {postId, userId})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static cancelProviderAssignment(postId, userId) {
        return axios.put(`${this.POSTS_API}/cancelProviderAssignment`, {postId, userId})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static getUserTasks(userId) {
        return axios.get(`${this.POSTS_API}/getUserTasks/${userId}`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static finishTask(postId) {
        const status = 'PENDING'; // pending
        return axios.put(`${this.POSTS_API}/updateStatus`, {postId: postId, status: status})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }

    static approveFinished(postId) {
        const status = 'COMPLETED'; // pending
        return axios.put(`${this.POSTS_API}/updateStatus`, {postId: postId, status: status})
            .then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error)
            });
    }
}