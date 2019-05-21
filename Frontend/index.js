const URL = 'http://localhost:3000/shoes';
let currentShoe;

// Button to show review form
const formContainer = document.getElementById('form-container')
const formToggle = document.createElement('button')
formToggle.innerText = 'Write a Review'
formToggle.className = 'btn.btn-secondary'
formToggle.addEventListener('click', toggleForm)
formContainer.appendChild(formToggle)

// Toggle button off, form on - on above button click
function toggleForm() {
  formToggle.style.display = "none";
  reviewForm.style.display = "block";
}

// Set event listener for submit
const reviewForm = document.getElementById('new-review');
reviewForm.style.display = "none";
reviewForm.addEventListener('submit', writeReview);

// Initial fetch for sidebar
fetch(URL)
  .then(res => res.json())
  .then(shoes => {shoes.forEach(shoe => putShoesOnDom(shoe))})

// Put items from fetch on sidebar
function putShoesOnDom(shoe) {
  const list = document.getElementById('shoe-list')

  if (list.querySelectorAll('li').length == 0) {
    displayShoe(shoe)
  }

  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerText = shoe.name;

  li.addEventListener('click', () => {
    displayShoe(shoe)
  });

  list.appendChild(li);
}

// Changes main display, resets currentShoe variable to main display
function displayShoe(shoe) {
  document.getElementById('shoe-image').src = shoe.image;
  document.getElementById('shoe-name').innerText = shoe.name;
  document.getElementById('shoe-description').innerText = shoe.description;
  document.getElementById('shoe-price').innerText = `$${shoe.price}`;

  const list = document.getElementById('reviews-list')
  reviews = getReviews(shoe)
  list.innerHTML = reviews
  currentShoe = shoe
}

// Gets all reviews for shoe display
function getReviews(shoe) {
  return shoe.reviews.map(r => `<li class="list-group-item">${r.content}</li>`).join('')
}

// Sends new form to the database
function writeReview(event) {
  event.preventDefault()
  content = document.getElementById('review-content').value

  fetch(URL + `/${currentShoe.id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({review: {content}, id: currentShoe.id})
  }).then(res => res.json())
    .then(doc => addReview(doc))
}

// Renders new review + switches review form off & toggle on
function addReview(doc) {
  reviews = getReviews(currentShoe)
  reviews += `<li class="list-group-item">${doc.content}</li>`
  document.getElementById('reviews-list').innerHTML = reviews
  document.getElementById('review-content').value = ''
  formToggle.style.display = "block";
  reviewForm.style.display = "none";
}
