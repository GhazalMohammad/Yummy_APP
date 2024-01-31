let dis = document.getElementById("dis");
let categor = document.getElementById("categor");
let area = document.getElementById("area");
let search = document.getElementById("search");
let input = document.getElementById("in");

let allItem = [];
function getData(s) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`)
    .then((response) => response.json())
    .then((data) => {
      allItem = data.meals;
      dispalyData();
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// --------------------------------------------------------------------
search.addEventListener("click", function (e) {
  let input = document.getElementById("in");

  dis.innerHTML = `<div class="container">
        <div class="row py-4">
            <div class="col-md-10 d-flex m-auto">
                
            </div>
        </div>
    </div>`;
});

// --------------------------------------------------------------------
let allCateg = [];
function getCateg() {
  let myCategories = new XMLHttpRequest();
  myCategories.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  myCategories.send();
  myCategories.addEventListener("readystatechange", function () {
    if (myCategories.readyState == 4) {
      allCateg = JSON.parse(myCategories.response).categories;
    }
  });
}
// ---------------------------------------------------------------------
let allArea = [];
function getArea(list) {
  let myArea = new XMLHttpRequest();
  myArea.open(
    "GET",
    `https://www.themealdb.com/api/json/v1/1/list.php?a=${list}`
  );
  myArea.send();
  myArea.addEventListener("readystatechange", function (e) {
    if (myArea.readyState == 4) {
      allArea = JSON.parse(myArea.response).meals;
    }
  });
}
// ---------------------------------------------------------------------
function dispalyData() {
  let cartona = ``;
  for (let i = 0; i < allItem.length; i++) {
    cartona += `
            <div class="col-md-3 ">
                <div class="item" id="item${i}">
                    <img class="w-100" src=${allItem[i].strMealThumb}>
                    <div class="layer d-flex align-items-center justify-content-center " id="layer${i}">
                        <h3 class="m-0">${allItem[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
  }
  document.querySelector(".container .row").innerHTML = cartona;
  // ---------------------------------------------------------------------------
  for (let i = 0; i < allItem.length; i++) {
    let currentItem = document.getElementById(`item${i}`);
    currentItem.addEventListener("click", function () {
      dis.innerHTML = `
            <div class="container mt-5" id="mealItem">
            <div class="row">
                <div class="col-md-4">
                    <div class="meal-img m-4">
                        <img class="w-100" src="${allItem[i].strMealThumb}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text mt-3">
                            <h3 class="text-white">Instructions</h3>
                                <p class=" text-white">${allItem[i].strInstructions}</p>
                                <h3 class="text-white">Area : ${allItem[i].strArea}</h3>
                                <h3 class="text-white">Category : ${allItem[i].strCategory}</h3>
                                <h3 class="text-white">${allItem[i].strMeal}</h3>
                                <h3 class="text-white">Tags :</h3>
                                <a href="${allItem[i].strSource}" class="btn btn-success mt-5">Source</a>
                                <a href="${allItem[i].strYoutube}" class="btn btn-danger mt-5">Youtube</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
            `;
    });
  }
}
// -------------------------------------------------------
function dispalyCatg() {
  categor.addEventListener("click", function (e) {
    let cartona = ``;
    for (let i = 0; i < allCateg.length; i++) {
      cartona += `
                <div class="col-md-3 ">
                    <div class="item" id="item${i}">
                        <img class="w-100" src=${allCateg[i].strCategoryThumb}>
                        <div class="layer d-flex align-items-center justify-content-center " id="layer${i}">
                            <h3 class="m-0">${allCateg[i].strCategory}</h3>
                           
                        </div>
                    </div>
                </div>
            `;
    }
    document.querySelector(".container .row").innerHTML = cartona;
  });
}
// -----------------------------------------------------------------------------
function displayArea() {
  area.addEventListener("click", function (e) {
    let cartona = ``;
    for (let i = 0; i < allArea.length; i++) {
      let itemId = `item${i}`;
      cartona += `
                <div class="col-md-3 ">
                    <div class="item" id="${itemId}">
                        <i class="fa-solid fa-house-laptop fa-4x w-100 text-center m-1"></i>
                        <h3 class="m-3 text-center text-white">${allArea[i].strArea}</h3>                    
                    </div>
                </div>
            `;
    }

    document.querySelector(".container .row").innerHTML = cartona;

    for (let i = 0; i < allArea.length; i++) {
      let currentItem = document.getElementById(`item${i}`);
      if (currentItem) {
        currentItem.addEventListener("click", function () {
          let clickedArea = allArea[i].strArea;
          console.log(` ${clickedArea}`);
          getArea((city = clickedArea));
          let cartona = ``;
          for (let i = 0; i < allArea.length; i++) {
            let itemId = `item${i}`;
            cartona += `
                <div class="col-md-3 ">
                    <div class="item" id="${itemId}">
                    <img class="w-100" src=${allArea[i].strMealThumb}>
                    <div class="layer d-flex align-items-center justify-content-center " id="layer${i}">
                        <h3 class="m-0">${allArea[i].strMeal}</h3>
                    </div>
                                         
                    </div>
                </div>
            `;
          }

          document.querySelector(".container .row").innerHTML = cartona;
        });
      } else {
        console.log(`${itemId}`);
      }
    }
  });
}

// --------------------------------------------------------

// navbar
let isNavVisible = false;
function toggleNavbar() {
  $("#navbar").animate({ left: isNavVisible ? "-250px" : "0px" });
  $("#nav-header").animate({ left: isNavVisible ? "0px" : "230px" });
  isNavVisible = !isNavVisible;
}
$("#nav-icon").click(toggleNavbar);

async function startApp(s = "Beef") {
  await getData((s = "Beef"));
  await getCateg();
  await getArea((city = "list"));
  dispalyCatg();
  displayArea();
}

startApp((s = "Beef"));

if (input) {
  input.addEventListener("input", function (e) {
    getData((s = `${input.value}`));
  });
} else {
  console.error("Element with id 'in' not found");
}

if (area) {
  area.addEventListener("click", function (e) {});
} else {
  console.error("Element with id 'area' not found");
}
