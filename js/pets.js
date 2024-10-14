// load data by category
const loadDataByCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const petSection = document.getElementById('pets');
            petSection.innerHTML = '';
            const loadingContainer = document.getElementById('loadingSection');
            const loading = document.createElement('div');
            loading.innerHTML = 
            `<span class="loading loading-bars loading-lg"></span>
            <span class="loading loading-bars loading-lg"></span>
            <span class="loading loading-bars loading-lg"></span>
            <span class="loading loading-bars loading-lg"></span>
            `;
            loadingContainer.append(loading);
            const myTimeout = setTimeout (displayFinally, 2000);
            function displayFinally () {
                loading.innerHTML = '';
                if((data.data).length == 0){
                    petSection.classList.remove('grid');
                    petSection.innerHTML = 
                    `<div class="bg-slate-300 rounded-md flex flex-col justify-center items-center py-14 text-center">
                    <img src="./images/error.webp">
                    <p class="py-4 font-bold text-2xl">No Information Available</p>
                    <p>This category animal is not available right now. We are sorry!</p>
                    </div>
                    `
                }else{
                    petSection.classList.add('grid');
                    displayData(data.data)
                    }
            }
            }
            )
            .catch(err => console.log('an error occurred to load categories data',err));
};

// load category
const loadCategory= () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch(err => console.log('error occurred to load data of category',err));
};
// load animals details for the sidebar
const addToSelected =(id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => addToSidebar(data.petData))
        .catch(err => console.log('an error occurred to load details',err));
};
// display photo from details to the sidebar
const addToSidebar = (data)=>{
    const sideBar = document.getElementById('sidebar');
    const selected = document.createElement('div');
    selected.innerHTML = 
    `<img class="rounded" src='${data.image}'>
    `;
    sideBar.append(selected); 
}

// display category buttons
const displayCategory= (categories) => {
    const categorySection = document.getElementById('categorySection');
    for(const eachCategoryData of categories){
        const newBtn = document.createElement('div');
        newBtn.innerHTML = 
        `<button id="btn-${eachCategoryData.category}" onclick="loadDataByCategory('${eachCategoryData.category}')" class="btn btn-lg px-9 border-solid rounded-full border-slate-300  font-semibold"><img src='${eachCategoryData.category_icon}'>${eachCategoryData.category}s</button>
        `;
        categorySection.append(newBtn);
    };
};
loadCategory();
// load all data
const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayData(data.pets))
        .catch(err => console.log('an error occurred to load all data',err));
};
// load details of pets to show on modals
const loadDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.petData))
        .catch(err => console.log('an error occurred to load details',err));
};
// show details in modals
const showDetails = (details) => {
    const modalContainer = document.getElementById('modalContainer');
    const message = document.createElement('div');
    modalContainer.innerHTML = '';
    message.innerHTML = 
    `<img class='h-1/2 w-1/2' src='${details.image}'>
    <div  class='flex justify-between'>
        <div>
            <p>Breed: ${details.breed}</p>
            <p>Gender: ${details.gender}</p>
            <p>Vaccinated status: ${details.vaccinated_status}</p>
        </div>
        <div>
            <p>Birth: ${details.date_of_birth}</p>
            <p>Price: ${details.price}$</p>
        </div>
    </div>
    <div class='divider'>
    </div>
    <div>
        <p class='font-semibold text-xl text-black'>Details Information</p>
        <p>${details.pet_details}</P>
    </div>
    `;
    modalContainer.append(message);
    document.getElementById('detailsModal').showModal();
};

//display data
const displayData = (pets) => {
        loading.innerHTML = '';
        const petSection = document.getElementById('pets');
        for(const pet of pets){
            const newPet = document.createElement('div');
            newPet.classList.add('p-5','border', 'border-solid', 'border-slate-200');
            const details = `${pet.pet_details}`;
            newPet.innerHTML = 
            `<img class='w-72 h-40 rounded-xl' src='${pet.image}'>
            <p class='text-xl font-semibold'>${pet.pet_name}</p>
            <p>Breed: ${pet.breed}</p>
            <p>Birth: ${pet.date_of_birth}</p>
            <p>Gender: ${pet.gender}</p>
            <p>Price: ${pet.price}$</p>
            <div class='divider'></div>
            <div class='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-1'>
            <button class='mx-auto md:mx-0' onclick='addToSelected(${pet.petId})'><img class='h-5 w-5' src='./images/like.png'></button>
            <button class='btn text-sky-500'>Adopt</button>
            <button onclick="loadDetails(${pet.petId})" class='btn text-sky-500'>Details</button>
            </div>
            `;
            petSection.append(newPet);
        };    
};
loadData();
const loading = () => {
    
};

