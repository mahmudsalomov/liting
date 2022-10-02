class Request {

    static config(){
        return ({
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        });
    }
    //Category
    static async getAllCategories() {
        let cat=[]
        await axios.get("/api/category/all",this.config())
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
        await axios.get("/api/category/all/sort",this.config())
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
        await axios.get("/api/category/all/types",this.config())
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
        await axios.get("/api/category/all/children?id="+id,this.config())
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
        await axios.get("/api/category/parent?id="+id,this.config())
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
        await axios.get("/api/category/all/not/parent",this.config())
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

        await axios.post("/api/category/delete/"+id,this.config())
            .then(function (response) {
                result=response.data;
            })
            .catch(function (error) {
                console.log(error)
                result=error.response.data
            })

        return result;
    }

    static async checkParent(id) {
        let cat=false
        await axios.get("/api/category/check_parent?id="+id,this.config())
            .then(function (response) {
                console.log(response)
                cat = response.data;
            })
            .catch(function (error) {
                console.log(error)
                return false
            })
        return cat
    }

















    //Blog
    static async count(id) {
        let count=0;
        let url='/api/blog/count';
        if (id){
            url+="?category="+id;
        }
        await axios.get(url,this.config())
            .then(function (response) {
                console.log(response)
                count = response.data;
            })
            .catch(function (error) {
                console.log(error)
                return 0;
            })
        return count
    }

    static async getAllBlog(page,category) {
        let blogs=[]

        let url="/api/blog/all"

        if (category&&category!='0'){
            url+="/"+category
        }
        if (page){
            url+="?page="+(page-1)
        }


        await axios.get(url,this.config())
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

    static async getAllBlogByCategory(id) {
        let blogs=[]
        await axios.get("/api/blog/all/"+id,this.config())
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
        await axios.get("/api/blog/one/"+id,this.config())
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

        axios.post("/api/blog/main_slider_changer/"+id+"?isMainSlider="+isMainSlider,this.config())
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

        await axios.post("/api/blog/delete/"+id,this.config())
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
        await axios.get("/api/statistics/all",this.config())
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

        await axios.post("/api/statistics/delete/"+id,this.config())
            .then(function (response) {
                result=response.data;
            })
            .catch(function (error) {
                console.log(error)
                result=error.response.data
            })

        return result;
    }









    static async check(header){
        let check=false;
        await axios.get("/api/auth/check",header)
            .then(function (res) {
                check=res.data
            })
        return check;
    }


}



