document.addEventListener("DOMContentLoaded", () => {

  const URL = `http://localhost:3000/shoes`
  let reviewContainer = document.querySelector('.list-group-flush')
  let reviewForm = document.querySelector('form')

    fetch(URL)
    .then(response => response.json())
    .then(shoes => shoes.forEach(listShoes))
   
  function listShoes(shoe) {
    const sideBar = document.querySelector('.list-group')
    const shoeCollLength = document.querySelectorAll('.list-group-item')

    if (shoeCollLength.length == 0) {
      showShoe (shoe)
    }

    const li = document.createElement('li')
    li.innerHTML += `<li class="list-group-item" data-id='${shoe.id}'>${shoe.name}</li>`
    li.style.listStyleType = "none"; 
    li.addEventListener('click', () => {showShoe(shoe)})

    sideBar.appendChild(li) 
  }

  function showShoe(shoe) {
    let {name, image, description, price} = shoe //this is destructuring, it allows us to take out any attribute of a given object and basically, I just don't need to write now shoe.img but just img

    const img = document.querySelector('img')
    img.src = image

    const title = document.querySelector('h4')
    title.innerText = name

    const descr = document.querySelector('.card-text')
    descr.innerText = description

    const dollarz = document.querySelector('.text-muted')
    dollarz.innerText = `${price} dollarz`

    const revUl = document.querySelector('.list-group-flush')
    revUl.innerHTML = getReviews(shoe)

    const form = document.querySelector('#form-container')
    form.addEventListener('submit', () => {
      addReview(event, shoe)})
  }

  function getReviews(shoe) {
    reviewContainer.style.listStyleType = "none";
    return shoe.reviews.map(r => `<li id="shoe-${shoe.id}"> ${r.content} </li>`).join("")
  }

  function addReview(event, shoe) {
    event.preventDefault();
    let reviewContent = event.target[0].value
    slapItOnTheBackend(reviewContent, shoe)
    slapItOnTheDOM(reviewContent, shoe)
    reviewForm.reset();
  }

  function slapItOnTheBackend(reviewContent, shoe){
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'},
      body: JSON.stringify({"content": reviewContent})
    })
    .then(response => response.json())
  }

  function slapItOnTheDOM(reviewContent, shoe){
    reviewContainer.innerHTML += `<li id="shoe-${shoe.id}"> ${reviewContent} </li>`
  }
})
