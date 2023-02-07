$.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:8000/articles/all',
}).done((data) => {
    if (data.status == 200) {
        let d = ''
        for (i in data.data) {
            d += `
            <div class="card my-3">
                <img src="static/uploads/${data.data[i].img_src}" alt="${data.data[i].title}" class="text-center" width="100%">    
                <div class="card-header">
                    <h1 class="my-2">${data.data[i].title}</h1>
                    <div class="d-flex gap-3 text-muted my-2">
                        <p>${data.data[i].date}</p> 
                        <p>${data.data[i].time}</p> 
                    </div>
                    <p> - ${data.data[i].author}</p>
                </div>  
                <div class="card-body">
                    <p class="h5">${data.data[i].description}</p>
                </div>
                <div class="card-footer d-flex gap-2">
                    <a href="/articles/${data.data[i].slug}" class="btn btn-lg btn-primary">Read More</a>
                    <a href="/articles/edit/${data.data[i].slug}" class="btn btn-lg btn-success">Edit</a>
                    <form action="/articles/${data.data[i].slug}" method="post">
                        <button type="submit" class="btn btn-lg btn-danger">Delete</button>
                    </form>
                </div>
        </div>
                 `
        }
        $('#articles').append(d)






        // for (i in data.data) {
        //     con.append(`
        //         <div class="card my-3">
        //         <div class="card-header">
        //             <h1 class="my-2">${data.data[i].title}</h1>
        //             <div class="d-flex gap-3 text-muted my-2">
        //                 <p>${data.data[i].date}</p> 
        //                 <p>${data.data[i].time}</p> 
        //             </div>
        //             <p> - ${data.data[i].author}</p>
        //         </div>
        //         <div class="card-body">
        //             <p class="h5">${data.data[i].description}</p>
        //         </div>
        //         <div class="card-footer d-flex gap-2">
        //             <a href="/articles/${data.data[i].slug}" class="btn btn-lg btn-primary">Read More</a>
        //             <a href="/articles/edit/${data.data[i].slug}" class="btn btn-lg btn-success">Edit</a>
        //             <form action="/articles/${data.data[i].slug}" method="post">
        //                 <button type="submit" class="btn btn-lg btn-danger">Delete</button>
        //             </form>
        //         </div>
        //     </div>
        //         `)
        // }
    }
})
