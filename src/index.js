// write your code here
document.querySelector('#new-ramen').addEventListener('submit',handleSubmit)


//Event handlers
function handleSubmit (event){
    event.preventDefault()
    let foodObject = {
        name:event.target.name.value,
        restaurant:event.target.restaurant.value,
        image:event.target.image.value,
        rating:event.target.rating.value,
        comment:event.target.comment.value
    }

    console.log(foodObject)
    postRamen(foodObject)
}

function renderNavFoods(data){

    //Ramen Images rendering on the navbar
    let card = document.createElement('img')
    card.src = `${data.image}`
    card.setAttribute('id','navRamens')
    card.onclick = function(){
        //Ramen main central picture with its details
    let detailsDiv = document.getElementById('ramen-detail')
    let cards = document.createElement('img')
    cards.setAttribute('id','ramens')
    cards.src=`${data.image}` 
    let defaultDetailsChild = detailsDiv.children[0]

    let nameDiv = document.createElement('h2')
    nameDiv.setAttribute('class','name')
    nameDiv.textContent = `${data.name}`
    let defaultNameDiv = detailsDiv.children[1]

    let restaurantDiv = document.createElement('h3')
    restaurantDiv.setAttribute('class','restaurant')
    restaurantDiv.textContent = `${data.restaurant}`
    let defaultRestaurantDiv = detailsDiv.children[2]

    let insertRatingDiv = document.querySelector('p #rating-display')
    insertRatingDiv.outerHTML = `<span id="rating-display">${data.rating}</span>`

    let insertCommentDiv = document.querySelector('p#comment-display')
    insertCommentDiv.outerHTML = `<p id='comment-display'>${data.comment}</p>`


//Add Ramen details to the DOM
detailsDiv.replaceChild(cards,defaultDetailsChild)
detailsDiv.replaceChild(nameDiv,defaultNameDiv)
detailsDiv.replaceChild(restaurantDiv,defaultRestaurantDiv)

    }
    //Add food to the DOM
    document.querySelector('#ramen-menu').appendChild(card)
}





//Fetch Requests
//Get fetch for all food resources
function getAllFoods(){
    fetch('http://localhost:3000/ramens')
    .then(function(res){

        return res.json()
   })
    .then(function(foodData){
        for(i=0; i<foodData.length;i++){
            renderNavFoods(foodData[i])
        }
   })
}

//Post into the database

function postRamen(foodObject){

      const configurationObject = {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(foodObject),
      };

      fetch("http://localhost:3000/ramens", configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (object) {
          console.log(object);
        })
        .catch(function (error) {
          alert("Bad things! Ragnarők!");
          console.log(error.message);
        });
}





//Initial Renderer
//Get Data and render our food to the DOM
function initialize(){
    getAllFoods()

}
initialize() 

