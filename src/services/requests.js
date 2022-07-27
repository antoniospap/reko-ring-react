import http from "./http-common"

class FarmDataService {
    /* USER */
    createUser(data){
        return http.post(`/users`,data);
    }
    getUserByFBID(fbUserID) {
        return http.get(`/users/fbuserid?id=${fbUserID}`);
    }

    /* PROFILE & FARM */
    getFarmByID(farmID){
        return http.get(`/farm?id=${farmID}`);
    }
    createFarm(data){
        return http.post(`/farms`, data);
    }
    updateFarm(data){
        return http.put(`/farm?id=${data.userID}`, data);
    }

    


    /* ARTICLES */
    createArticle(data){
        return http.post(`/articles`, data);
    }
    getArticles() {
        return http.get(`/articles`);
    }
    getArticlesByID(id){
        return http.get(`/article?id=${id}`);
    }
    getAllArticlesOfUserID(id){
        return http.get(`/articles/userID?id=${id}`);
    }

    /* CARTS */
    completeCart(data){
        return http.post(`/createCart`, data);
    }
    getAllUserCarts(userID){
        return http.get(`/carts?id=${userID}`);
    }
    getAllCartsOfArticle(id){
        return http.get(`/carts/articleID?id=${id}`);
    }
    updateCartStatus(id,data){
        return http.put(`/carts?id=${id}`, data);
    }
    cancelCart(id){
        return http.delete(`/carts?id=${id}`);
    }
    archiveCart(id, data){
        return http.put(`/archiveCart?id=${id}`, data);
    }


    
}

export default new FarmDataService();