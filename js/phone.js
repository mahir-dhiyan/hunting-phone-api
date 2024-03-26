const loadData = async (searchTxt,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTxt}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) => {
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
    console.log('is Show all ',isShowAll);
    //display only first 15 phones
    if(!isShowAll){
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
const handleShowDetails = async(id) =>{
    console.log(id);
    //load  single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}

//handle search
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    // console.log(searchTxt);
    loadData(searchTxt,isShowAll);
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
const handleShowall=()=>{
        handleSearch(true);
}
// loadData();