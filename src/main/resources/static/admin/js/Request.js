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
            })
        return result;
    }

}





