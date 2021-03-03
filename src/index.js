document.addEventListener('DOMContentLoaded', () => {
    fetchSpiceBlend()
    submitHandler()
    fetchImages()
    clickHandler()
})

const fetchSpiceBlend = (id=1) => {
    fetch(`http://localhost:3000/spiceblends/${id}`)
    .then(resp => resp.json())
    .then(blend => renderSpiceBlend(blend))
}

const renderSpiceBlend = blend => {
    const img = document.querySelector('img.detail-image')
    img.src = blend.image
    img.alt = blend.title

    const h2 = document.querySelector('h2.title')
    h2.innerText = blend.title

    const titleInput = document.querySelector('input#spiceblend-title')
    titleInput.value = blend.title

    const updateForm = document.querySelector('form#update-form')
    updateForm.dataset.id = blend.id
    
    const ingredientForm = document.querySelector('form#ingredient-form')
    ingredientForm.dataset.id = blend.id

    if (!!blend.ingredients) renderIngredients(blend)
}

const renderIngredients = (blend) => {
    const ul = document.querySelector('ul.ingredients-list')
    ul.innerHTML = ""
    blend.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.innerText = ingredient.name
        li.className = 'ingredient'
        li.dataset.ingredientId = ingredient.id
        ul.append(li)
    })
}

// function renderIngredients(blend) {
//     const ul = document.querySelector('ul.ingredients-list')
//     blend.ingredients.forEach(function(ingredient) {
//         const li = document.createElement('li')
//         li.innerText = ingredient.name
//         ul.append(li)
//     })
// }

const submitHandler = () => {
    document.addEventListener('submit', (e) => {
        e.preventDefault()
        if (e.target.id === 'update-form') {
            const title = e.target.title.value
            const updateObj = {title}
            const blendId = e.target.dataset.id
            updateTitle(blendId, updateObj)
        } else if (e.target.id === 'ingredient-form') {
            const name = e.target.name.value
            const spiceblendId = parseInt(e.target.dataset.id)
            const postObj = {
                            name, 
                            spiceblendId
                        }
            postIngredient(postObj)
        }
    })
}

const updateTitle = (blendId, updateObj) => {
    fetch(`http://localhost:3000/spiceblends/${blendId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:   JSON.stringify(updateObj)
    })
    .then(resp => resp.json())
    .then(blend => renderUpdatedTitle(blend))
}

const renderUpdatedTitle = blend => {
    const h2 = document.querySelector('h2.title')
    h2.innerText = blend.title
}


const postIngredient = postObj => {
    fetch(`http://localhost:3000/ingredients/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:   JSON.stringify(postObj)
    })
    .then(resp => resp.json())
    .then(ingredient => renderIngredient(ingredient))
}

const renderIngredient = ingredient => {
    const ul = document.querySelector('ul.ingredients-list')
    const li = document.createElement('li')
    li.dataset.ingredientId = ingredient.id
    li.innerText = ingredient.name
    li.className = 'ingredient'
    ul.append(li)
}

const fetchImages = () => {
    fetch(`http://localhost:3000/spiceblends/`)
    .then(resp => resp.json())
    .then(blends => renderImages(blends))
}

const renderImages = blends => {
    const div = document.querySelector('div#spice-images')
    blends.forEach(blend => {
        const img = document.createElement('img')
        img.src = blend.image
        img.className = 'spiceblend-image'
        img.dataset.blendId = blend.id
        div.append(img)
    })
}

const clickHandler = () => {
    document.addEventListener('click', (e) => {
        if (e.target.className === 'spiceblend-image') {
            console.log("click")
            const blendId = e.target.dataset.blendId
            fetchSpiceBlend(blendId)
        } else if (e.target.className === 'ingredient') {

            deleteIngredientFetch(e.target.dataset.ingredientId)
        }
    })
}

const deleteIngredientFetch = id => {
    fetch(`http://localhost:3000/ingredients/${id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json()).then(byeBye => removeIngredient(id))
}

const removeIngredient = id => {
    const ingredient = document.querySelector(`[data-ingredient-id='${id}']`)
    ingredient.remove()
}



// See all spice blend images in the #spice-images div 
//locate the spice images div
//GET request

// when the page loads. 
// invoke function in DCL

// Request the data from the server to get all the spice blends. 
    //GET /spiceblends

// Then, display the image for each of the spice blends 
    //forEach spiceblend.image
// using an img tag inside the #spice-images div.
    //create img tag
    //save blendId to img tag









































// document.addEventListener('DOMContentLoaded', () => {
//     fetchSpiceBlend()
//     submitHandler()
//     fetchSpiceBlends()
//     clickHandler()
// })

// const fetchSpiceBlends = () => {
//     fetch(`http://localhost:3000/spiceblends/`)
//     .then(response => response.json())
//     .then(spiceBlends => {
//        renderImages(spiceBlends)
//     }) 
// }

// const renderImages = spiceBlends => {
//     const imageDiv = document.querySelector('#spice-images')
//     spiceBlends.forEach(blend => {
//         const img = document.createElement('img')
//         img.className = "spice-image"
//         img.src = blend.image
//         img.alt = blend.title
//         img.dataset.blendId = blend.id
//         imageDiv.append(img)
//     })
// }


// const fetchSpiceBlend = (id=1) => {
//      fetch(`http://localhost:3000/spiceblends/${id}`)
//      .then(response => response.json())
//      .then(spiceBlends => {
//         renderSpiceBlend(spiceBlends)
//      })   
// }

// const renderSpiceBlend = (blend) => {
//     const img = document.querySelector('img.detail-image')
//     img.src = blend.image

//     const div = document.querySelector('div#spice-blend-detail')
//     div.dataset.id = blend.id

//     const updateForm = document.querySelector('#update-form')
//     updateForm.dataset.id = blend.id

//     const ingredientForm = document.querySelector('#ingredient-form')
//     ingredientForm.dataset.id = blend.id

//     const h2 = document.querySelector('h2.title')
//     h2.innerText = blend.title

//     const titleInput = document.querySelector('input#spiceblend-title')
//     titleInput.value = blend.title

//     if (blend.ingredients) renderIngredients(blend)
// } 

// const renderIngredients = blend => {
//     const ul = document.querySelector('ul.ingredients-list')
//     ul.innerText = ""
//     blend.ingredients.forEach(ingredient => {
//         const li = document.createElement('li')
//         li.dataset.ingredientId = ingredient.id
//         li.innerText = ingredient.name
//         ul.append(li)
//     })
// }

// const renderIngredient = ingredient => {
//     const ul = document.querySelector('ul.ingredients-list')
//     const li = document.createElement('li')
//     li.dataset.ingredientId = ingredient.id
//     li.innerText = ingredient.name
//     ul.append(li)
// }

// const submitHandler = () => {
//     document.addEventListener('submit', (e) => {
//         e.preventDefault()
//         if (e.target.id === "update-form") {
//             const title = e.target.title.value
//             const updateObj = {title}
//             const spiceblendId = parseInt(e.target.dataset.id)
//             patchTitle(spiceblendId, updateObj)
//         } else if (e.target.id === 'ingredient-form') {
//             const name = e.target.name.value
//             const spiceblendId = parseInt(e.target.dataset.id)
//             const ingredientObj = {
//                                     name,
//                                     spiceblendId
//                                 }
//             if (name !== "") postIngredient(ingredientObj)
//         }
//     })
// }

// const clickHandler = () => {
//     document.addEventListener('click', (e) => {
//         if (e.target.className = 'spice-image') {
//             const id = e.target.dataset.blendId
//             fetchSpiceBlend(id)
//         }
//     })
// }

// const patchTitle = (id, updateObj) => {
//     fetch(`http://localhost:3000/spiceblends/${id}`, {
//         method: "PATCH",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(updateObj)
//     })
//     .then(resp => resp.json())
//     .then(spiceblendObj => udpateBlendTitle(spiceblendObj))
// }

// const udpateBlendTitle = spiceblendObj => {
//     const h2 = document.querySelector('h2.title')
//     h2.innerText = spiceblendObj.title
// }

// const postIngredient = ingredientObj => {
//     fetch('http://localhost:3000/ingredients/', {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(ingredientObj)
//     })
//     .then(resp => resp.json())
//     .then(ingredient => renderIngredient(ingredient))
// }
