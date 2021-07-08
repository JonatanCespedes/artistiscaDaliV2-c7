// Capturo los elementos del DOM
let navBar = document.getElementById("navigation-bar");
let searchBar = document.getElementById("search");

function dropMenu(){
    if (navBar.style.display === "block") {
        navBar.style.display = "none";
    } else {
        navBar.style.display = "block";
        searchBar.style.display = "none";
    }
}


function dropSearch(){
    if (searchBar.style.display === "block") {
        searchBar.style.display = "none";
    } else {
        searchBar.style.display = "block";
        navBar.style.display = "none";
    }
}