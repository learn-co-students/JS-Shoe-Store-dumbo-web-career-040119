// Code your solution here
const shoeList = document.querySelector('#shoe-list');
// shoeList.addEventListener('click',function(e){
//     console.log(e.target);
//     console.log(e.target)
//     // currentShoe = shoe;
//     //         //currentReviews = shoe.reviews;
//     //         displayShoe();
//     //         displayReviews();
// })
//tie an event listener for its children elements;

const formReview = document.querySelector('#new-review');
let currentShoe = null;

document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded');
    getShoes();
})

formReview.addEventListener('submit', newReview);

function newReview(e){
    e.preventDefault();
    //console.log(currentReviews);
    //console.log(currentShoe);
    //console.log(e.target[0].value);
    fetch(`http://localhost:3000/shoes/${currentShoe.id}/reviews`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: e.target[0].value
        })   
    })
    .then(resp => resp.json())
    .then(data => {
        //just to refresh reviews
        displayReviews();
    })
    formReview.reset();
}

function displayShoe(){
    const shoeImage = document.querySelector('#shoe-image');
    const shoeName = document.querySelector('#shoe-name');
    const shoeDescription = document.querySelector('#shoe-description');
    const shoePrice = document.querySelector('#shoe-price');
    shoeImage.src = currentShoe.image;
    shoeName.innerText = currentShoe.name;
    shoeDescription.innerText = currentShoe.description;
    shoePrice.innerText = currentShoe.price;
    //console.log(currentShoe.reviews);
}

function displayReviews(){
    const shoeReviews = document.querySelector('#reviews-list');
    //resets container
    // while (shoeReviews.firstChild) {
    //     shoeReviews.removeChild(shoeReviews.firstChild);
    // }

    //does the same thing
    shoeReviews.innerHTML = "";
    fetch(`http://localhost:3000/shoes/${currentShoe.id}`)
    .then(resp => resp.json())
    .then(shoe => {
        console.log(shoe.reviews);
        shoe.reviews.forEach(review => {
            let li = document.createElement('li');
            li.innerText = review.content;
            shoeReviews.appendChild(li);
        })
        //console.log(currentReviews.reviews);
    })  
}

function getShoes(){  
    fetch('http://localhost:3000/shoes')
    .then(resp => resp.json())
    .then(data => {
        createShoeElements(data);
    })
}

function createShoeElements(data){
    data.forEach(shoe => {
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = shoe.name;
        //li.setAttribute('element', shoe)
        
        li.addEventListener('click',function(){
            currentShoe = shoe;
            //currentReviews = shoe.reviews;
            displayShoe();
            displayReviews();
        })
        shoeList.appendChild(li);
    })
}