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

        // Asignacion de la fecha tomada desde la API
        currentDate = eventsToCatch.currentDate


        //Mapeo de eventos eliminando las categorias repetidas
        let mapEvents = dataArray.map(lista => lista.category);
        const dataA = new Set(mapEvents);
        let dataArrayFiltrado = [...dataA];

        //Llamado de funciones que necesitan el fetch
        checkPage()
        printChecks('#table_checks', dataArrayFiltrado)
        

    }
    catch (error) {
        console.log(error.message)
    }


}

getEvents()




//Print de las cards 
function cards(array) {

    let updateCard = document.getElementById("div-cards-events")

    array = array.map(element => {


        return `
        <div class="col">
              <div class="card h-100">
                  <img src="${element.image}" class="card-img-top h-50" alt="cinema">
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
                              <a href="/templates/details.html?id=${element._id}" class="btn btn-secondary">More info</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        `
    })

    updateCard.innerHTML = array.join('')

}

//Chequeamos la pagina con el nombre de la misma, para saber que eventos printear

function checkPage() {
    let upcomingEvents = dataArray.filter(dataArray => dataArray.date >= currentDate)
    let pastEvents = dataArray.filter(dataArray => dataArray.date < currentDate)
    let title = document.getElementById("titleMain")
    if (title.textContent == "Upcoming Events") {
        cards(upcomingEvents)
    } else if (title.textContent == "Past Events") {
        cards(pastEvents)

    }
    //Siempre hay que tener cuidado por si se rompe algo
    else {
        console.log("que rompimo")
    }
}




//Print de todos los checks de forma dinamica, usando un map
function printChecks(id_etiqueta, array_tipos) {
    let container = document.querySelector(id_etiqueta)
    array_tipos = array_tipos.map(each => {
        return `

    <div class="d-flex p-3 ms-5 gap-5"> 
    <fieldset>
    <input onclick="captureData()" class="form-check-input class_checks" type="checkbox" id="${each}" role="switch" id="flexSwitchCheckDefault" value="${each}">
    <label class="form-check-label" for="${each}">${each}</label>
    </fieldset>

    </div>
  
    `
    })
    array_tipos.push(`<div class= "input-group mb-2 w-25 container">
  <input oninput="captureData()"  id="id_search" class="form-control h-1" type="text" name="text" placeholder= "Search" > 
  </div>
  `)
    container.innerHTML = array_tipos.join('')
}

//Llamamos a la funcion con el ID de los checks y las categorias filtradas sin repetir
printChecks('#table_checks', dataArrayFiltrado)

//Capturo los datos para realizar el filtro funcional

function captureData() {
    let text = document.getElementById('id_search').value.toLowerCase()
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value) //Forma no aceptada por Edge
    let upcomingEvents = dataArray.filter(dataArray => dataArray.date >= currentDate)
    let pastEvents = dataArray.filter(dataArray => dataArray.date < currentDate)
    //Antes de realizar el filtro, se chequea que array hay que filtrar con un if.
    let title = document.getElementById("titleMain")
    if (title.textContent == "Upcoming Events") {
        let filterUpcoming = upcomingEvents.filter(each => {
            return (
                each.name.toLowerCase().includes(text)
            ) && (
                    (checks.length === 0 || checks.includes(each.category))
                )
        })
        if (filterUpcoming.length > 0) {
            cards(filterUpcoming)
        }
        else {
            notFound()

        }

    }
    else if (title.textContent == "Past Events") {

        let filterPast = pastEvents.filter(each => {
            return (
                each.name.toLowerCase().includes(text)
            ) && (
                    (checks.length === 0 || checks.includes(each.category))
                )
        })
        if (filterPast.length > 0) {
            cards(filterPast)
        }
        else {
            notFound()

        }
    }

}



//Funcion para el print de card no encontrada
function notFound() {
    let notFoundCard = document.getElementById("div-cards-events")

    notFoundCard.innerHTML = `
        <div class="container text-center">
              <div class="card h-100">
                  
                  <div class="card-body ">
                      <h5 class="card-title">Card not Found</h5>
                      <p class="card-text">Please try again</p>
                      
                  </div>
                  
                   
              </div>
          </div>
        `
}





