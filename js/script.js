'use strict';

class Cat {
	constructor(catName, breed, ownerName, address, phone, food, gender, comment, photo) {
		this.catName = catName;
		this.breed = breed;
		this.ownerName = ownerName;
		this.address = address;
		this.phone = phone;
		this.food = food;
		this.gender = gender;
		this.comment = comment;
		this.photo = photo;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const cats = [];
	const catName = document.querySelector('#catname');
	const breed = document.querySelector('#breed');
	const ownerName = document.querySelector('#ownername');
	const address = document.querySelector('#address');
	const phone = document.querySelector('#phone');
	const food = document.querySelectorAll('.form__food');
	const gender = document.querySelectorAll('input[name="gender"]');
	const comment = document.querySelector('#comment');
	document.querySelector('.button__submit').addEventListener('click', handleSubmitClick);
	document.querySelector('.button__reset').addEventListener('click', handleResetClick);

	const elements = [catName, breed, ownerName, address, phone, comment];
	elements.forEach(el => {
		setInputValueFromLs(el, getItemFromLs(el));
		el.addEventListener('focusout', handleFocusOut);
	});
	gender.forEach(el => {
		el.addEventListener('change', handleRadioChange);
	});
	food.forEach(el => {
		el.addEventListener('click', handleFoodChange);
	});
	phone.addEventListener('input', handlePhoneInput);

	function handleSubmitClick(e) {
		e.preventDefault();
		let catNameValue = catName.value;
		let breedValue = breed.value;
		let ownerNameValue = ownerName.value;
		let addressValue = address.value;
		let phoneValue = phone.value;
		if (checkRequiredFields()) {
			let cat = new Cat(catNameValue, breedValue, ownerNameValue, addressValue, phoneValue, getFood(), getGender());
			cats.push(cat);
			console.log(cats);
			sendToBackend(cat);
			// alert('Info is stored in localStorage');
		}
	}

	function sendToBackend(obj) {
		fetch('https://httpbin.org/post', {
				method: 'POST',
				body: JSON.stringify(obj),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
			.then(response => response.json())
			.then(cat => {
				console.log(cat);
			})
			.catch(error => console.log(error));
	}

	function handleFocusOut(event) {
		let value = event.target.value;
		if (value !== '' && getItemFromLs(event.target) !== value) {
			setItemToLs(event.target);
			removeClassInvalid(event.target);
		}
	}

	function handleRadioChange(event) {
		const id = event.target.id;
		gender.forEach(el => {
			if (el.id === id) {
				el.checked = true;
			} else {
				el.checked = false;
			}
		});
	}

	function handlePhoneInput(e) {
		const clearedValue = e.target.value.replace(/[^0-9]/ig, '');
		e.target.value = clearedValue;
	}

	function handleFoodChange(event) {
		if (event.target.checked === true) {
			event.target.classList.add('checked');
		} else {
			event.target.classList.remove('checked');
		}
	}

	function checkRequiredFields() {
		const fields = [
			[catName.value, '#catname'],
			[ownerName.value, '#ownername'],
			[phone.value, '#phone']
		];

		let res = true;
		fields.forEach(field => {
			if (!field[0]) {
				addClassInvalid(field[1]);
				res = false;
			}
		});
		return res;
	}

	function isItemInLs(element) {
		return (!!localStorage.getItem(element.id));
	}

	function setItemToLs(element) {
		localStorage.setItem(element.id, element.value);
	}

	function getItemFromLs(element) {
		return localStorage.getItem(element.id);
	}

	function setInputValueFromLs(element, value) {
		if (isItemInLs(element) && value !== element.value) {
			element.value = value;
		}
	}

	function getFood() {
		const selectedFood = document.querySelectorAll('input[name="food"]:checked');
		let selectedFoodValues = [...selectedFood].map(food => food.value);
		return selectedFoodValues;
	}

	function getGender() {
		return document.querySelector('input[name="gender"]:checked').id;
	}

	function addClassInvalid(selector) {
		document.querySelector(selector).classList.add('invalid');
	}

	function removeClassInvalid(element) {
		element.classList.remove('invalid');
	}

	function handleResetClick(e) {
		e.preventDefault();
		elements.forEach(el => el.value = '');
	}
	//TODO
	// changes for code-review

	// let formElement = document.querySelector('#form')
	// let fd = new FormData(formElement)
	// Array.from(fd)
});