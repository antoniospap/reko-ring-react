import http from "./http-common"

class FarmDataService {
    /* USER */
    createUser(data){
        return http.post(`/users`,data);
    }
    getUserByFBID(fbUserID) {
        return http.get(`/users/fbuserid/${fbUserID}`);
    }

    /* PROFILE / FARM*/
    getFarmByID(farmID){
        return http.get(`/farms/${farmID}`);
    }
    createFarm(data){
        return http.post(`/farms`, data);
    }
    updateFarm(data){
        return http.put(`/farms/${data.userID}`, data);
    }

    createArticle(data){
        return http.post(`/articles`, data);
    }


    /* ARTICLES */
    getArticles() {
        return http.get(`/articles`);
    }
    getFarms(){
        return http.get(`/farms`);
    }
    getArticlesByID(id){
        return http.get(`/articles/${id}`);
    }
    
}

export default new FarmDataService();