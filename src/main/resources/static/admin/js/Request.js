class Request {

    //Category
    static async getAllCategories() {
        let cat=[]
        await axios.get("/api/category/all")
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return cat
    }

    static async getAllCategoriesSorted() {
        let cat=[]
        await axios.get("/api/category/all/sort")
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return cat
    }

    static async getCategoryTypes(){
        let types=[]
        await axios.get("/api/category/all/types")
            .then(function (response) {
                console.log(response)
                types = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return types
    }

    static async getChildren(id) {
        let cat=[]
        await axios.get("/api/category/all/children?id="+id)
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return cat
    }
    static async getParent(id) {
        let cat={};
        await axios.get("/api/category/parent?id="+id)
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return {}
            })
        return cat
    }

    static async getAllCategoriesNotParent() {
        let cat=[]
        await axios.get("/api/category/all/not/parent")
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return cat
    }


    static async addOrEditCategory(data) {
        let result;
        let config = {
            method: '',
            url: '',
            data
        };
        if (data.id === "" || data.id == null) {
            config.method = 'post';
            config.url = '/api/category/add'
        } else {
            config.method = 'put';
            config.url = '/api/category/edit'
        }
        await axios(config)
            .then(function (res) {
                result=res;
            })
            .catch(function (error) {
                console.log(error);
            });
        return result
    }

    static async deleteCategory(id){
        let result;

        await axios.post("/api/category/delete/"+id)
            .then(function (response) {
                result=response.data;
            })
            .catch(function (error) {
                console.log(error)
                result=error.response.data
            })

        return result;
    }


















    //Blog
    static async getAllBlog() {
        let blogs=[]
        await axios.get("/api/blog/all")
            .then(function (response) {
                console.log(response)
                blogs = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return blogs
    }

    static async getAllBlogByCategory() {
        let blogs=[]
        await axios.get("/api/category/all/not/parent")
            .then(function (response) {
                console.log(response)
                blogs = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return blogs
    }



    static async getOne(id){
        let blog={};
        await axios.get("/api/blog/one/"+id)
            .then(function (response) {
                console.log(response)
                blog=response.data.object
            })
            .catch(function (error) {
                console.log(error)
                alert(error.response.data.message)
            })
        return blog;
    }


    static async addOrEditBlog(data) {
        let result="";
        let config = {
            method: '',
            url: '',
            data
        };
        if (data.id === "" || data.id == null) {
            config.method = 'post';
            config.url = '/api/blog/add'
        } else {
            config.method = 'put';
            config.url = '/api/blog/edit'
        }
        await axios(config)
            .then(function (res) {
                result=res;
                alert("Saqlandi")
                window.location.href="/admin/blog"
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.message)
                return error
            });
        return result
    }

    static async saveFiles(files){
        let result;
        let param = new window.FormData();
        param.append("files",files[0])

        await axios.post("/api/file/upload",param,{headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(function (response) {
                result=response.data.object;
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                alert(error.response.data)
            })
        return result;
    }

    static async changeMainSlider(id,isMainSlider){

        axios.post("/api/blog/main_slider_changer/"+id+"?isMainSlider="+isMainSlider)
            .then(function (response) {
                // return true;
            })
            .catch(function (error) {
                console.log(error)
                alert(error.response.data.message)
            })
    }



    static async deleteBlog(id){
        let result;

        await axios.post("/api/blog/delete/"+id)
            .then(function (response) {
                result=response.data;
            })
            .catch(function (error) {
                console.log(error)
                result=error.response.data
            })

        return result;
    }






















    // Statistics
    static async getAllStatistics() {
        let cat=[]
        await axios.get("/api/statistics/all")
            .then(function (response) {
                console.log(response)
                cat = response.data.object;
            })
            .catch(function (error) {
                console.log(error)
                return []
            })
        return cat
    }

    static async addOrEditStatistics(data) {
        let result;
        let config = {
            method: '',
            url: '',
            data
        };
        if (data.id === "" || data.id == null) {
            config.method = 'post';
            config.url = '/api/statistics/add'
        } else {
            config.method = 'put';
            config.url = '/api/statistics/edit'
        }
        await axios(config)
            .then(function (res) {
                result=res;
            })
            .catch(function (error) {
                console.log(error);
            });
        return result
    }

    static async deleteStatistics(id){
        let result;

        await axios.post("/api/statistics/delete/"+id)
            .then(function (response) {
                result=response.data;
            })
            .catch(function (error) {
                console.log(error)
                result=error.response.data
            })

        return result;
    }


}



