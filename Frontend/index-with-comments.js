document.addEventListener("DOMContentLoaded", () => {

  const URL = `http://localhost:3000/shoes`
  let reviewContainer = document.querySelector('.list-group-flush')
  let reviewForm = document.querySelector('form')

  // make the fetch happen
    fetch(URL)
    .then(response => response.json())
    .then(shoes => shoes.forEach(listShoes))
    // the above line is a shortened version of:
    //  .then(shoes => shoes.forEach(shoe => listShoes(shoe)))

  // add shoes to the sidebar (it accepts a shoe from the fetch)
  function listShoes(shoe) {
    const sideBar = document.querySelector('.list-group')
    const shoeCollLength = document.querySelectorAll('.list-group-item')

  // if the array of shoes in the SideBar is 0, just show the first shoe that comes!
    if (shoeCollLength.length == 0) {
      showShoe (shoe)
    }

  // now that we established which shoe will be shown in the beginning, let's focus on the individual element of the list
    const li = document.createElement('li')
    li.innerHTML += `<li class="list-group-item" data-id='${shoe.id}'>${shoe.name}</li>`
    li.style.listStyleType = "none"; //I don't want the list to have the dots
    li.addEventListener('click', () => {showShoe(shoe)}) // we need a callback here!

    // okay, our single li is done -- let's append it!
    sideBar.appendChild(li) 
  }

    // Okay, now a shoe card:
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

  // DONE! Let's now write a method that will iterate over all the reviews of the given shoe
  function getReviews(shoe) {
    reviewContainer.style.listStyleType = "none";
    return shoe.reviews.map(r => `<li id="shoe-${shoe.id}"> ${r.content} </li>`).join("")
  }

    // Now, a method that will make it possible to post a comment:
  function addReview(event, shoe) {
    event.preventDefault();
    // let's grab the review from the form
    let reviewContent = event.target[0].value
    // let's post to the backend
    slapItOnTheBackend(reviewContent, shoe)
    // now that it's on the backend, let's slap it on the dom
    slapItOnTheDOM(reviewContent, shoe)
    // let's wipe out the form
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
