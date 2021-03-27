const url = ('http://localhost:3000/ramens')
const ramenDetail = document.querySelector('div#ramen-detail')
const menuDiv = document.querySelector('div#ramen-menu')
const newRamenForm = document.querySelector('form#new-ramen')
// See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an an img tag inside the #ramen-menu div.

function showAllRamen() {
    fetch(url)
    .then(response => response.json())
    .then(ramen => { 
        ramen.forEach(ramenImg => {
            ramenMenu(ramenImg)
        })
    })
}

function ramenMenu (menuObj) {
    const container = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X'

    const menuDiv = document.querySelector('div#ramen-menu')
    const img = document.createElement('img')
    img.src = menuObj.image 
    img.dataset.id = menuObj.id

    container.append(deleteButton, img)
    
    menuDiv.append(container)
}

// Click on an image from the #ramen-menu div and see all the info about that ramen 
// displayed inside the #ramen-detail div, as well as the current rating and comment 
//for the ramen displayed in the #ramen-rating form.

function ramenInfo(ramen) {
    // const ramenDetail = document.querySelector('div#ramen-detail')
    // ramenDetail.dataset.id = ramen.id
    const img = ramenDetail.querySelector('img')
    img.src = ramen.image 
    img.alt = ramen.name 

    const h2 = ramenDetail.querySelector('h2')
    h2.textContent = ramen.name

    const h3 = ramenDetail.querySelector('h3')
    h3.textContent = ramen.restaurant

    const ramenRating = document.querySelector('form#ramen-rating')
    ramenRating.dataset.id = ramen.id 

    ramenRating.rating.value = ramen.rating
    ramenRating.comment.value = ramen.comment
}

menuDiv.addEventListener('click', event => {
    if (event.target.matches('img')) {
        fetch(`${url}/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(ramenMenuObject => {
            ramenInfo(ramenMenuObject)
        })
    }
})

// Update the rating and comment for a ramen. When the #ramen-rating form is submitted, it should update the value on the server. Changes should also be reflected on the frontend (you can test this by submitting the form; clicking a different ramen image; then clicking the image for the ramen you updated - you should see the rating and comment that you submitted previously).

const ramenRating = document.querySelector('form#ramen-rating')

ramenRating.addEventListener('submit', event => {
    event.preventDefault()
    //updating form 
    const rating = event.target.rating.value 
    const comment = event.target.comment.value 
    const newRating = {
        rating,
        comment
    }
    fetch(`${url}/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newRating)
    })
    .then(response => response.json())
    .then(newInfo => (newInfo))
})

function firstRamenLoad(firstRamen) {
    const img = ramenDetail.querySelector('img')
    img.src = firstRamen.image 
    img.alt = firstRamen.name 

    const h2 = ramenDetail.querySelector('h2')
    h2.textContent = firstRamen.name

    const h3 = ramenDetail.querySelector('h3')
    h3.textContent = firstRamen.restaurant

    const ramenRating = document.querySelector('form#ramen-rating')
    ramenRating.dataset.id = firstRamen.id 

    ramenRating.rating.value = firstRamen.rating
    ramenRating.comment.value = firstRamen.comment
}

function firstImageLoad() {
    fetch(url)
    .then(response => response.json())
    .then(firstRamenImage => {
        firstRamenLoad(firstRamenImage[0])
    })
}

newRamenForm.addEventListener('submit', event => {
    event.preventDefault()

    const name = event.target.name.value
    const restaurant = event.target.restaurant.value
    const image = event.target.image.value
    const rating = event.target.rating.value
    const comment = event.target['new-comment'].value
    const newRamenObj = {name, restaurant, image, rating, comment}

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(response => response.json())
    .then(createNewRamen => {
        ramenInfo(createNewRamen)
    })
})

// DELETE // 

menuDiv.addEventListener('click', event => {
    if (event.target.matches('button')) {
        console.log(event.target)
        const id = event.target.nextElementSibling.dataset.id
        
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(deleteImg => {
            const deleteButtonParent = event.target.closest('div')
            deleteButtonParent.remove()
        })
    }
})

firstImageLoad()
showAllRamen()

































































// // write your code here
// const url = 'http://localhost:3000/ramens'
// const ramenMenu = document.querySelector('div#ramen-menu')
// const ratingForm = document.querySelector('form#ramen-rating')
// const detailImage = document.querySelector('img.detail-image')

// function renderFirstRamen() {
//     fetch(url) 
//     .then(response => response.json()) 
//     .then(ramenArr => {
//         openingRamen(ramenArr[0])
//         // ramenArr.forEach (ramen => {
//         //     renderRamenMenu(ramen)
//         //     console.log(ramen)
//         });
//     })
// }

// function renderRamenMenu (ramen) {
//     fetch(url)
//     .then(response => response.json())
//     .then(ramenArr => {
//         ramenArr.forEach(ramen => {
//             const imgTag = document.createElement('img')
//             imgTag.src = ramen.image
//             imgTag.dataset.id = ramen.id
//             ramenMenu.append(imgTag)
//         // })
    
//     // })
// }

// // Click on an image from the #ramen-menu div and see all the info about that 
// // ramen displayed inside the #ramen-detail div, as well as the current rating 
// // and comment for the ramen displayed in the #ramen-rating form.


// ramenMenu.addEventListener('click', event => {
//     if (event.target.tagName === ('IMG')) {
//         fetch(`${url}/${event.target.dataset.id}`)
//         .then(response => response.json()) 
//         .then(ramenObject => {
//             const img = document.querySelector('img.detail-image')
//             const h2 = document.querySelector('h2.name')
//             const h3 = document.querySelector('h3.restaurant')

//             img.src = ramenObject.image
//             img.alt = ramenObject.name 
            
//             h2.textContent = ramenObject.name
//             h3.textContent = ramenObject.restaurant

//             const ratingInput = document.querySelector('input#rating')
            
//             const ratingComment = document.querySelector('textarea#comment')

//             ratingInput.value = ramenObject.rating
//             ratingForm.dataset.id = ramenObject.id
//             ratingComment.value = ramenObject.comment
//             console.dir(event.target)
//         })
//     }
// })

// // Update the rating and comment for a ramen. 
// // When the #ramen-rating form is submitted, it should update 
// // the value on the server. Changes should also be reflected on 
// // the frontend (you can test this by submitting the form; 
// // clicking a different ramen image; then clicking the 
// // image for the ramen you updated - you should see the rating and comment that you submitted previously).


// ratingForm.addEventListener('submit', event => {
//     event.preventDefault()
//     const rating = event.target.rating.value
//     const comment = event.target.comment.value

//     fetch(`${url}/${ratingForm.dataset.id}`, {
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({rating: rating, comment: comment})
//     })
//         .then(response => response.json())
// })

// function openingRamen(ramenObject) {

//     const img = document.querySelector('img.detail-image')
//     const h2 = document.querySelector('h2.name')
//     const h3 = document.querySelector('h3.restaurant')

//     img.src = ramenObject.image
//     img.alt = ramenObject.name 
    
//     h2.textContent = ramenObject.name
//     h3.textContent = ramenObject.restaurant

//     const ratingInput = document.querySelector('input#rating')
    
//     const ratingComment = document.querySelector('textarea#comment')

//     ratingInput.value = ramenObject.rating
//     ratingForm.dataset.id = ramenObject.id
//     ratingComment.value = ramenObject.comment
// }

// function addNewRamen(event) {
//     event.preventDefault()
//     const name = event.target.name.value
//     const restaurant = event.target.restaurant.value
//     const image = event.target.image.value
//     const rating = event.target.rating.value
//     const comment = event.target['new-comment'].value

//     fetch(url, {
//     method: 'POST',
//     headers: {
//         "content-type": "application/json"
//     },
//     body: JSON.stringify({name, restaurant, image, rating, comment})
//     })
//     .then(response => response.json())
//     .then(newRamen => {
//     })
//     ramenMenu(newRamen)
//     renderFirstRamen(newRamen)
// }


// renderFirstRamen()
// // renderRamenMenu()



// // # 2 