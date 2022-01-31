

function all() {
    axios.get("/api/category/all")
        .then(function (response) {

            let categories=response.data;

            console.log(response)
            console.log(categories)
        })
        .catch(function (error) {
            console.log(error)
        })
}
all()
