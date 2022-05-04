class Cat {
	constructor(catName, breed, ownerName, food, gender) {
		this.catName = catName;
		this.breed = breed;
		this.ownerName = ownerName;
		this.address = address;
		this.phone = phone;
		this.food = food;
		this.gender = gender;
	}
}

document.querySelector('.button__submit').addEventListener('click', handleSubmitClick);

const catNameValue = document.querySelector('#catname').value;
const breedValue = document.querySelector('#breed').value;
const ownerNameValue = document.querySelector('#ownername').value;
const addressValue = document.querySelector('#address').value;
const phoneValue = document.querySelector('#phone').value;
const genderValue = document.querySelector('input[name="gender"][checked]').id;

let form = new FormData()

function handleSubmitClick() {
	let res = true;
	checkCatName();
	checkBreed();
	checkOwnerName();
	checkAddress();
	checkPhone();
	getFood();
	getGender();
	if (res) {
		let cat1 = new Cat(catNameValue, breedValue, ownerNameValue, addressValue, phoneValue, food, gender);
	}
}

function addClassInvalid(selector) {
	document.querySelector(selector).classList.add('invalid');
}

function removeClassInvalid(selector) {
	document.querySelector(selector).classList.remove('invalid');
}

// let formElement = document.querySelector('#form')
// let fd = new FormData(formElement)
// Array.from(fd)