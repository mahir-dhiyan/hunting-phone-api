const loadData = async (searchTxt = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTxt}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //  console.log(phones.length);
    //display show all button if there are more than 15 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 15 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is Show all ',isShowAll);
    //display only first 15 phones
    if (!isShowAll) {
        phones = phones.slice(0, 15);
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <div class="card bg-gray-100 shadow-xl">
        <figure><img src="${phone.image}"
                alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
    //hide loading spinner
    toggleLoadingSpinner(false);
}
//handle show Details
const handleShowDetails = async (id) => {
    // console.log(id);
    //load  single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}
//show phone details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-phone-details-name');

    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    // showDetailsContainer.classList.add('text-center');
    // showDetailsContainer.classList.add('flex');
    // showDetailsContainer.classList.add('flex-col');
    // showDetailsContainer.classList.add('items-center');

    showDetailsContainer.innerHTML = `
        <img class="mx-auto" src = "${phone.image}"/>
        <p class="text-wrap"><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p class="text-wrap"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p class="text-wrap"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p class="text-wrap"><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p class="text-wrap"><span class="font-bold">GPS:</span>${phone?.others?.GPS}</p>
    `
    //show the modal
    show_details_modal.showModal()
}

//handle search
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    // console.log(searchTxt);
    loadData(searchTxt, isShowAll);
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowall = () => {
    handleSearch(true);
}
loadData();