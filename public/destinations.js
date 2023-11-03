var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function showDivs(n) {
var i;
var x = document.getElementsByClassName("mySlides");
if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    x[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-activity');

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            sendActivityRequest(this.getAttribute('id'));
        });
    });
});

function sendActivityRequest(id) {
    fetch('http://localhost:3000/addDestanation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        if (id < 5) {
            alert('Restaurant added successfully to the Itinerary!');
        }else{
            alert('Activity added successfully to the Itinerary!');
        }

    

    })
    .catch(error => {
        console.error('Request failed:', error);
    });
}
