const container = document.querySelector('.container');
// grabs all and puts them in a node list(similar to an array)
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatCount = selectedSeats.length

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
})