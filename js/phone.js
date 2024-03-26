const loadData = async (searchTxt) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTxt}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
     phoneContainer.textContent='';
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <div class="card bg-gray-100 shadow-xl">
        <figure><img src="${phone.image}"
                alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
}

//handle search
const handleSearch = () =>{
    
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    console.log(searchTxt);
    loadData(searchTxt);
}
// loadData();