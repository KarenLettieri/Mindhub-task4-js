let query = location.search
let params = new URLSearchParams(query)
let idParams = params.get("id")

let details = dataArray.find(info => info._id == idParams)



function detailsCard(array) {

  const container = document.getElementById("container-detail")
  let html = "";

  html += `
          <div class="row row-cols-2">
          <div class="col-6">
            <img src="${array.image}" class="img-fluid container-sm" >
          </div>
          <div class="col-lg-6">
            <h1>${array.name}</h1>
            <h3>${array.category}</h3>
            <p> ${array.description}
            </p>

            <p> <span class="text-muted">Price: ${array.price}.</span>
            </p>
            <p> <span class="text-muted">Capacity: ${array.capacity}.</span>
            
            </p>
            <p> <span class="text-muted">Place: ${array.place}.</span>
            </p>
            
        </div>
`

  container.innerHTML = html


}

