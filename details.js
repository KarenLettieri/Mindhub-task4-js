function detailsCard(array) {

  const container = document.getElementById("container-detail")

  array = array.map(element => {

    return  `
        <div class="col">
              <div class="card h-100">
                  <img src="${element.image}" class="card-img-top h-50">
                  <div class="card-body">
                      <h5 class="card-title">${element.name}</h5>
                      <p class="card-text">${element.description}</p>
                      <p class="card-text text-muted">Date: ${element.date}</p>
                      <p class="text-muted card-text">Place: ${element.place}</p>
                  </div>
                  <div class="card-footer">
                      <div class="container text-center">
                          <div class="row">
                              <div class="col">
                                  <p class="text-muted fs-5 text-center">Price:$${element.price}</p>
                                  </div>
                              <div class="col">
                              </div>
                              <div class="col">
                                  <a href="./templates/details.html?id=${element._id}" class="btn btn-secondary">More info</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        `
  })

  container.innerHTML += array.join('')


}

