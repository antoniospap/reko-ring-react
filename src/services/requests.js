import http from "./http-common"

class FarmDataService {
    /* USER */
    createUser(data){
        return http.post(`/users`,data);
    }
    getUserByFBID(fbUserID) {
        return http.get(`/users/fbuserid/${fbUserID}`);
    }

    /* PROFILE & FARM */
    getFarmByID(farmID){
        return http.get(`/farms/${farmID}`);
    }
    createFarm(data){
        return http.post(`/farms`, data);
    }
    updateFarm(data){
        return http.put(`/farms/${data.userID}`, data);
    }

    


    /* ARTICLES */
    createArticle(data){
        return http.post(`/articles`, data);
    }
    getArticles() {
        return http.get(`/articles`);
    }
    getArticlesByID(id){
        return http.get(`/articles/${id}`);
    }
    getAllArticlesOfUserID(id){
        return http.get(`/articles/userID/${id}`);
    }

    /* CARTS */
    completeCart(data){
        return http.post(`/carts/`,data);
    }
    getAllUserCarts(userID){
        return http.get(`/carts/`,userID);
    }
    getAllCartsOfArticle(id){
        return http.get(`/carts/articleID/${id}`);
    }
    updateCartStatus(id,data){
        return http.put(`/carts/${id}`, data);
    }
    cancelCart(id){
        return http.delete(`/carts/${id}`);
    }
    archiveCart(id, data){
        return http.put(`/carts/${id}`, data);
    }


    
}

export default new FarmDataService();