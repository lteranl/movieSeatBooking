const container = document.querySelector('.container');
// grabs all and puts them in a node list(similar to an array)
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value

// save selected movie and price
function setMovieData (movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}
// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // copy selected seats into an array, map through array, return a new array
    // map() simillar to forEach, map() returns an array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    // coverting seatsIndex arr into a string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatCount = selectedSeats.length

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}
// get data from local storage and populate ui
function populateUI () {
    //json.parse doing the opposite of json stringify
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})
// seat click event
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
})

// initial count and total set
updateSelectedCount();