const BASE_URL = window.location.origin

function radio(x){
    if(x == 0){
        document.getElementById("sucursal-inputs").classList.remove("none");
        document.getElementById("domicilio-inputs").classList.add("none");
    } else {
        document.getElementById("domicilio-inputs").classList.remove("none");
        document.getElementById("sucursal-inputs").classList.add("none");
    }
}

    
    let $addToCart = document.querySelector('#addToCart')
    let $removeOne = document.querySelector('#removeOne')
    let $removeAll = document.querySelector('#removeAll')
    let $clearCart = document.querySelector('#clearCart')
    let $addToCartOk = document.querySelector('#addToCartOk')

    function addToCart (productId, quantity = 1){
        fetch(`${BASE_URL}/api/cart/${productId}/${quantity}`, {method: "POST"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            if(result.status === 200){
                alert('Producto agregado')
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }
    function removeOne (productId){
        fetch(`${BASE_URL}/api/cart/removeOne/${productId}`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            console.log(result)
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function removeAll (productId){
        fetch(`${BASE_URL}/api/cart/removeAll/${productId}`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            console.log(result)
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function clearCart (){
        fetch(`${BASE_URL}/api/cart/clearCart`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            console.log(result)
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

