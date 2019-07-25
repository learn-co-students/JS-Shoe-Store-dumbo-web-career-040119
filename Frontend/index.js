document.addEventListener("DOMContentLoaded", () => {

  const URL = `http://localhost:3000/shoes`

    fetch(URL)
    .then(response => response.json())
    .then(shoes => shoes.forEach(sideBar))

  function sideBar(shoe) {
    const sideBar = document.querySelector('.list-group')
    const shoeCollLength = document.querySelectorAll('.list-group-item')

    if (shoeCollLength.length == 0) {
      showShoe (shoe)
    }

    const li = document.createElement('li')
    li.innerHTML += `<li class="list-group-item" data-id='${shoe.id}'>${shoe.name}</li>`
    li.addEventListener('click', () => {showShoe(shoe)})

    sideBar.appendChild(li)
  }

  function getReviews(shoe) {
    return shoe.reviews.map(r => `<li id="shoe-${shoe.id}"> ${r.content} </li>`).join("")
  }

  function addReview(event, shoe) {
    event.preventDefault();
    const shoeid = shoe.id
    const reviewContent = event.target.parentNode.children[0].children[0].children[0].value
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'},
      body: JSON.stringify({"content": reviewContent})
    })
    .then(response => response.json())
    .then(review => document.querySelector('.list-group-flush').innerHTML += `<li id="shoe-${shoe.id}"> ${review.content} </li>`)
  }

  function showShoe(shoe) {
    let {name, image, description, price} = shoe

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


})
