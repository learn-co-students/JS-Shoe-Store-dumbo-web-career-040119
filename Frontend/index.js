// Code your solution here

function singleShoe(event){
  if (event.target.classList.contains("list-group-item")){
    let selfId = event.target.dataset.shoeId
    let shoeImage = document.querySelector("#shoe-image")
    let shoeName = document.querySelector("#shoe-name")
    let shoeDescription = document.querySelector("#shoe-description")
    let shoePrice = document.querySelector("#shoe-price")
    let shoeReviewList = document.querySelector("#reviews-list")

    fetch(`http://localhost:3000/shoes/${selfId}`)
      .then(res => res.json())
      .then(function(data){
        event.preventDefault()
        shoeReviewList.innerHTML = ""
        shoeFormContainer.innerHTML = ""
        shoeImage.src = data.image
        shoeName.innerText = data.name
        shoeDescription.innerText = data.description
        shoePrice.innerText = data.price
        shoeFormContainer.dataset.currShoe = data.id

        data.reviews.forEach(function(review){
          let reviewLi = document.createElement("li")
          reviewLi.className = "list-group-item"
          reviewLi.innerText = review.content

          shoeReviewList.appendChild(reviewLi)
        })
        let shoeForm = document.createElement("form")
        let shoeFormDiv = document.createElement("div")
        let shoeFormTextArea = document.createElement("textarea")
        let shoeFormInput = document.createElement("input")

        shoeForm.id = "new-review"
        shoeFormDiv.className = "form-group"
        shoeFormTextArea.className = "form-control"
        shoeFormTextArea.id = "review-content"
        shoeFormTextArea.setAttribute("rows", 3)
        shoeFormInput.className = "btn btn-primary"
        shoeFormInput.type = "submit"

        shoeFormDiv.appendChild(shoeFormTextArea)
        shoeFormDiv.appendChild(shoeFormInput)
        shoeForm.appendChild(shoeFormDiv)
        shoeFormContainer.appendChild(shoeForm)
      })
  }
}

function slapShoeOnTheList(data){
  let shoeLi = document.createElement("li")
  shoeLi.className = "list-group-item"
  shoeLi.innerText = data.name
  shoeLi.dataset.shoeId = data.id
  shoeList.appendChild(shoeLi)
}

function getShoeList(){
  fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(data => data.forEach(slapShoeOnTheList))
}

function addNewReview(data){
  let shoeReviewList = document.querySelector("#reviews-list")
  let reviewLi = document.createElement("li")
  reviewLi.className = "list-group-item"
  reviewLi.innerText = data.content
  shoeReviewList.appendChild(reviewLi)
}

function onSubmit(event){
  event.preventDefault()
  let reviewValue = document.querySelector("#review-content").value
  let selfId = event.target.parentElement.dataset.currShoe
  fetch(`http://localhost:3000/shoes/${selfId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ content: reviewValue })
  })
  .then(res => res.json())
  .then(data => addNewReview(data))
}

function bindShoeForm(){
  shoeFormContainer.addEventListener("submit", onSubmit)
}

document.addEventListener("DOMContentLoaded", function(){
  shoeList = document.querySelector("#shoe-list")
  shoeMainContainer = document.querySelector("#main-shoe")
  shoeFormContainer = document.querySelector("#form-container")
  shoeList.addEventListener("click", singleShoe)
  getShoeList()
  bindShoeForm()
})
