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
	const catName = document.querySelector('#catname');
	const breed = document.querySelector('#breed');
	const ownerName = document.querySelector('#ownername');
	const address = document.querySelector('#address');
	const phone = document.querySelector('#phone');
	const food = document.querySelectorAll('input[name="gender"]');
	const gender = document.querySelectorAll('input[name="gender"]');
	const comment = document.querySelector('#comment');

	const elements = [catName, breed, ownerName, address, phone, comment];
	elements.forEach(el => {
		setInputValueFromLs(el, getItemFromLs(el));
		el.addEventListener('focusout', handleFocusOut);
	});
	gender.forEach(el => {
		el.addEventListener('change', handleRadioChange);
	});

	document.querySelector('.button__submit').addEventListener('click', handleSubmitClick);

	function handleSubmitClick(e) {
		e.preventDefault();
		let catNameValue = catName.value;
		let breedValue = breed.value;
		let ownerNameValue = ownerName.value;
		let addressValue = address.value;
		let phoneValue = phone.value;
		if (checkRequiredFields()) {
			let cat = new Cat(catNameValue, breedValue, ownerNameValue, addressValue, phoneValue, getFood(), getGender());
			console.log(cat);
		}
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

	function checkRequiredFields() {
		const fields = [
			[catName.value, '#catname'],
			[ownerName.value, '#ownername'],
			[phone.value, '#phone']
		];

		let res = true;
		fields.forEach(field => {
			if (!field[0]) {
				console.log(field);
				addClassInvalid(field[1]);
				res = false;
			}
		});
		return res;
	}

	function isItemInLs(element) {
		return (localStorage.getItem(element.id));
	}

	function setItemToLs(element) {
		localStorage.setItem(element.id, element.value);
		console.log('Setted ' + element.value + ' to ' + element.id);
	}

	function getItemFromLs(element) {
		console.log('getItem: ' + localStorage.getItem(element.id));
		return localStorage.getItem(element.id);
	}

	function setInputValueFromLs(element, value) {
		if (isItemInLs(element) && value !== element.value) {
			element.value = value;
		}
	}

	function getFood() {
		console.log('getFood()');
	}

	function getGender() {
		return document.querySelector('input[name="gender"]:checked').id;
	}

	function addClassInvalid(selector) {
		document.querySelector(selector).classList.add('invalid');
		console.log('class Inv added to ' + selector);
	}

	function removeClassInvalid(element) {
		element.classList.remove('invalid');
	}

	// let formElement = document.querySelector('#form')
	// let fd = new FormData(formElement)
	// Array.from(fd)
});