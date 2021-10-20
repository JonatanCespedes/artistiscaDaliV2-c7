alert("vinculado")

const BASE_URL = "http://localhost:3000/api/"
let $subcategoriesSelect = document.querySelector('.subcategorySelect')
let $categoriesSelect = document.querySelector('.categorySelect')

async function handlerCategory (id) {
    await fetch(`${BASE_URL}categories/${id}`)
    .then(res => res.json())
    .then(result => {
        let category = result.data
        let subcategories = category.subcategories;
        for (let index = 0; index < subcategories.length; index++) {
            $subcategoriesSelect.innerHTML += `<option value="${subcategories[index].id}" <%= locals.old && old.subcategory == ${subcategories[index].name} ? "selected" : "" %>>${subcategories[index].name}</option>`
        }
    })
}

$categoriesSelect.addEventListener('change', function(e){
    handlerCategory(e.target.value)
})
