const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
let dataArray = []

async function getEvents() {

    try {
        const response = await fetch(API_URL);
        const eventsToCatch = await response.json();

        for (const event of eventsToCatch.events) {
            dataArray.push(event)
        }

        // Asignacion de la fecha tomada desde la API
        currentDate = eventsToCatch.currentDate
        let pastEvents = dataArray.filter(dataArray => dataArray.date < currentDate)
        let upcomingEvents = dataArray.filter(dataArray => dataArray.date >= currentDate)
        
        //Calculo del porcentaje de los eventos pasados asignado a un array nuevo
        arrayPercentage = getAttendance(pastEvents)


        //Llamado de funciones

        //Primera tabla
        printStatistics(arrayPercentage, pastEvents)

        //Segunda tabla
        upcomingStatistics(upcomingEvents)
       
       
        
    }
    catch (error) {
        console.log(error.message)
    }


}

getEvents()


//PRIMERA TABLA
function getAttendance(array) {
    // regla de 3. asistencia * 100 / capacidad
    
    array = array.map(element => {
     
        percentage = (element.assistance) * 100 / element.capacity
        return percentage
    })
    return array
}
   
// FUNCIONA PERO HAY QUE RETORNARLO A LA TABLA

function printStatistics(percentages, events) {
    let tableStats = document.getElementById("eventStatics")

    //Selecciono el menor y el mayor porcentaje
    let min = Math.min(...percentages)
    let max = Math.max(...percentages)


    //Hago un indexOf para buscar las posiciones de los arrays, para compararlas con el array de Past Events

    let indexMax = percentages.indexOf(max)
    let indexMin = percentages.indexOf(min)

    //Mapeo las capacidades para obtenerlas en un array
    capacity = events.map(element => {
        return element.capacity
    })
    // Selecciono la mayor capacidad y busco el index de la misma para retornarlo
    let capacityMax = Math.max(...capacity)
    let indexCapacity = capacity.indexOf(capacityMax)
    

    return `

    <td class="highestpercentage"> ${events[indexMax].name} (${max}) </td>
    <td class="lowestCap">${events[indexMin].name} (${min}) </td>
    <td class="largerCap">${events[indexCapacity].name} (${capacityMax}) </td>
        
     `

}

//SEGUNDA TABLA

function upcomingStatistics(array) {

     //Mapeo de eventos eliminando las categorias repetidas
     let mapEvents = array.map(lista => lista.category);
     const dataA = new Set(mapEvents);
     let categories = [...dataA];






}

function getRevenuesCategories(array) {

    let arrayCategories = []

    let categoryFood = array.filter(array => array.category === "Food")
    let categoryBooks = array.filter(array => array.category === "Books")
    let categoryParty = array.filter(array => array.category === "Party")
    let categoryRace = array.filter(array => array.category === "Race")
    let categoryConcert = array.filter(array => array.category === "Concert")
    let categoryMuseum = array.filter(array => array.category === "Museum")

    arrayCategories.push(getRevenues(categoryFood))
    arrayCategories.push(getRevenues(categoryBooks))
    arrayCategories.push(getRevenues(categoryParty))
    arrayCategories.push(getRevenues(categoryRace))
    arrayCategories.push(getRevenues(categoryConcert))
    arrayCategories.push(getRevenues(categoryMuseum))
    
    return arrayCategories
}




function getRevenues(array) {
    let revenue = 0
    for (let i = 0; i < array.length; i++) {
        revenue += array[i].price * array[i].estimate
    }

    return revenue


}


function getAttendanceUpcoming(array) {
    // regla de 3. asistencia * 100 / capacidad
    
    array = array.map(element => {
     
        percentage = (element.estimate) * 100 / element.capacity
        return percentage
    })
    return array
}
   



