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

        //Tercera tabla
        pastStatistics(pastEvents)
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

    tableStats.innerHTML = `

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

    //categories son todas las categorias de los eventos futuros

    //Defino las variables de revenues a donde voy a guardar los datos
    let revenueFood = 0
    let revenueBooks = 0
    let revenueParty = 0
    let revenueRace = 0
    let revenueConcert = 0
    let revenueMuseum = 0

    let percentageFood = []
    let percentageBooks = []
    let percentageParty = []
    let percentageRace = []
    let percentageConcert = []
    let percentageMuseum = []

    for (let i = 0; i < array.length; i++) {

        switch (array[i].category) {
            case "Food":
                revenueFood += getRevenuesUpcoming(array[i])
                percentageFood.push(getAttendanceUpcoming(array[i]))
                break;
            case "Books":
                revenueBooks += getRevenuesUpcoming(array[i])
                percentageBooks.push(getAttendanceUpcoming(array[i]))
                break;
            case "Party":
                revenueParty += getRevenuesUpcoming(array[i])
                percentageParty.push(getAttendanceUpcoming(array[i]))
                break;
            case "Race":
                revenueRace += getRevenuesUpcoming(array[i])
                percentageRace.push(getAttendanceUpcoming(array[i]))
                break;
            case "Concert":
                revenueConcert += getRevenuesUpcoming(array[i])
                percentageConcert.push(getAttendanceUpcoming(array[i]))
                break;
            case "Museum":
                revenueMuseum += getRevenuesUpcoming(array[i])
                percentageMuseum.push(getAttendanceUpcoming(array[i]))
                break;

        }
    }

    let revenues = [revenueFood, revenueBooks, revenueParty, revenueRace, revenueConcert, revenueMuseum]

    let percentageEvent = [sumAttendance(percentageFood),
    sumAttendance(percentageBooks),
    sumAttendance(percentageParty),
    sumAttendance(percentageRace),
    sumAttendance(percentageConcert),
    sumAttendance(percentageMuseum)]

    let table = document.getElementById("upcomingStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${percentageEvent[i]}%</td>
        </tr>`
        totalArray.push(html)
    }

    table.innerHTML = totalArray.join('')
}

function getRevenuesUpcoming(event) {
    return event.price * event.estimate
}

function getAttendanceUpcoming(event) {
    // regla de 3. asistencia * 100 / capacidad
    return event.estimate * 100 / event.capacity
}

function sumAttendance(array) {
    let sum = 0
    for (let percentage of array) {
        sum += percentage
    }
    return (sum / array.length).toFixed(2)
}

//TABLA 3

function pastStatistics(array) {

    //Mapeo de eventos eliminando las categorias repetidas
    let mapEvents = array.map(lista => lista.category);
    const dataA = new Set(mapEvents);
    let categories = [...dataA];
    console.log(categories)
    //categories son todas las categorias de los eventos futuros

    //Defino las variables de revenues a donde voy a guardar los datos
    let revenueFood = 0
    let revenueMuseum = 0
    let revenueConcert = 0
    let revenueRace = 0
    let revenueBooks = 0
    let revenueCinema = 0
    let revenueParty = 0

    let percentageFood = []
    let percentageMuseum = []
    let percentageConcert = []
    let percentageRace = []
    let percentageBooks = []
    let percentageCinema = []
    let percentageParty = []



    for (let i = 0; i < array.length; i++) {
        switch (array[i].category) {
            case "Food":
                revenueFood += getRevenuesPast(array[i])
                percentageFood.push(getAttendancePast(array[i]))
                break;
            case "Books":
                revenueBooks += getRevenuesPast(array[i])
                percentageBooks.push(getAttendancePast(array[i]))
                break;
            case "Party":
                revenueParty += getRevenuesPast(array[i])
                percentageParty.push(getAttendancePast(array[i]))
                break;
            case "Race":
                revenueRace += getRevenuesPast(array[i])
                percentageRace.push(getAttendancePast(array[i]))
                break;
            case "Concert":
                revenueConcert += getRevenuesPast(array[i])
                percentageConcert.push(getAttendancePast(array[i]))
                break;
            case "Museum":
                revenueMuseum += getRevenuesPast(array[i])
                percentageMuseum.push(getAttendancePast(array[i]))
                break;

            case "Cinema":
                revenueCinema += getRevenuesPast(array[i])
                percentageCinema.push(getAttendancePast(array[i]))
                break;

        }
    }

    let revenues = [revenueFood, revenueMuseum, revenueConcert, revenueRace, revenueBooks, revenueCinema, revenueParty]
    let percentageEvent = [
        sumAttendance(percentageFood),
        sumAttendance(percentageMuseum),
        sumAttendance(percentageConcert),
        sumAttendance(percentageRace),
        sumAttendance(percentageBooks),
        sumAttendance(percentageCinema),
        sumAttendance(percentageParty)
    ]

    let table = document.getElementById("pastStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${percentageEvent[i]}%</td>
        </tr>`

        totalArray.push(html)
    }

    table.innerHTML = totalArray.join('')
}

function getAttendancePast(event) {
    // regla de 3. asistencia * 100 / capacidad
    return event.assistance * 100 / event.capacity
}
function getRevenuesPast(event) {
    return event.price * event.assistance
}


