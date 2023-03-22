let dataArray = []
let currentDate = ""

const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"

async function getEvents() {

    try {
        const response = await fetch(API_URL);
        const eventsToCatch = await response.json();

        for (const event of eventsToCatch.events) {
            dataArray.push(event)
        }
        //Details
        let query = location.search
        let params = new URLSearchParams(query)
        let idParams = params.get("id")
        let details = dataArray.find(info => info._id == idParams)
        console.log(details)
        let container = document.getElementById("container-detail")

        container.innerHTML += `
             <div class="col">
              <div class="card h-100">
                  <img src="${dataArray[idParams-1].image}" class="card-img-top rounded mx-auto d-block">
                  <div class="card-body">
                      <h5 class="card-title">${dataArray[idParams-1].name}</h5>
                      <p class="card-text">${dataArray[idParams-1].description}</p>
                      <p class="card-text text-muted">Date: ${dataArray[idParams-1].date}</p>
                      <p class="text-muted card-text">Place: ${dataArray[idParams-1].place}</p>
                  </div>
                  <div class="card-footer">
                      <div class="container text-center">
                          <div class="row">
                            <p class="text-muted fs-5 text-center">Price:$${dataArray[idParams-1].price}</p>                                                  
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        `

    } catch (error) {
        console.log(error)
    }
}

getEvents()






