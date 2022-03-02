const displayResult = document.getElementById("display-result");
const searchPhone = () => {
    const inputField = document.getElementById("input-text");
    const error = document.getElementById("error");
    const inputValue = inputField.value;
    inputField.value = "";
    // Error Massage
    if (!isNaN(inputValue)) {
        error.innerText = "Type Phone Brand Name";
        displayResult.innerHTML = "";
    }
    // else if (inputValue == displayResult.brand)) {
    //     error.innerText = "Please Type Again";
    //     displayResult.innerHTML = "";
    // }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(response => response.json())
            .then(data => result(data.data))
        error.innerText = "";
    }
    displayResult.innerHTML = "";

};

const result = values => {
    for (const value of values) {
        const div = document.createElement("div");
        div.classList.add("col-lg-4")
        div.classList.add("mb-5")
        div.innerHTML = `
        <div class="card mx-auto mt-5 p-3 shadow p-3 mb-5 bg-body rounded-3" style="width: 17rem;">
        <img src="${value.image}" height="200" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Name</h5>
        <h6 class="text-primary">${value.phone_name}</h6>
        <h5 class="card-text">Brand</h5>
        <h6 class="text-primary">${value.brand}</h6>
        <button onclick="mobileDetails('${value.slug}')" class="btn btn-primary mt-2">Mobile Details</button>
        </div>
        </div>    
        `;
        displayResult.appendChild(div);

    }

};

const mobileDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
    error.innerText = "";

};

const showDetails = view => {
    const show1 = view.mainFeatures;
    const show2 = view.others;
    document.getElementById("display-details").innerHTML = `
    <div class="card mx-auto shadow p-3 mb-5 bg-body rounded-3 mt-5" style="width: 25rem;">
    <h5 class="text-center text-white bg-primary">Name: ${view.name}</h5>
    <img src="${view.image}" class="mx-auto mt-3" height="100" width="120" alt="...">
    <h6 class="text-primary text-decoration-underline">Display Size</h6>
        <p class="info"> ${show1.displaySize}</p>
        <h6 class="text-primary text-decoration-underline">Storage</h6>
        <p class="info"> ${show1.storage}</p>
        <h6 class="text-primary text-decoration-underline">Memory</h6>
        <p class="info"> ${show1.memory}</p>
        <h6 class="text-primary text-decoration-underline">Chipset</h6>
        <p class="info"> ${show1.chipSet}</p>
        <h6 class="text-primary text-decoration-underline">Bluetooth</h6>
        <p class="info"> ${show2.Bluetooth}</p>
    </div>
        `;

};