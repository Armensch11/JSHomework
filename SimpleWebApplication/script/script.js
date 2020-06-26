(function bodyFill() {
	let mainDiv = document.createElement('div');
	mainDiv.setAttribute('id', 'main');
	document.body.appendChild(mainDiv);
	let scalesWrapper = document.createElement('div');
	scalesWrapper.setAttribute('id', 'scales-wrapper');
	scalesWrapper.innerHTML = 'Daily trade Volume (BTC)';
	mainDiv.appendChild(scalesWrapper);
	let scales = [ 'up to 3.000', 'from 3000 to 10.000', 'more than 10.000' ];
	for (let i = 0; i < scales.length; i++) {
		let newDiv = document.createElement('div');
		newDiv.innerHTML = scales[i];
		newDiv.className = 'trade-range';
		scalesWrapper.appendChild(newDiv);
	}
	document.getElementById('big-container').appendChild(mainDiv);
})();
// let rightFrame = document.createElement('iframe');
// rightFrame.setAttribute('name', 'place-to-open-link');
// rightFrame.setAttribute('id', 'frame-for-page');
// rightFrame.width = '70%';
// rightFrame.height = '100%';

// document.getElementById('main').appendChild(rightFrame);
let colors = [
	'#036D40',
	'#8D9C21',
	'#F16E35',
	'#D6A31C',
	'#B0B9DF',
	'#9D527F',
	'#81A597',
	'#718459',
	'#C0C27F',
	'#FCCCFC'
];

let res;
let listParent = document.createElement('div');
listParent.setAttribute('id', 'exchange-list');
document.getElementById('main').appendChild(listParent);
listParent = document.getElementById('exchange-list');
function removeAllChildren(parNode) {
	while (parNode.childNodes[0]) {
		parNode.removeChild(parNode.childNodes[0]);
	}
}
document.getElementsByClassName('trade-range')[0].addEventListener('mouseenter', () => {
	let index = Math.floor(Math.random() * (colors.length - 1));
	document.getElementsByClassName('trade-range')[0].style.backgroundColor = colors[index];
	document.getElementsByClassName('trade-range')[0].style.opacity = 0.65;
});
document.getElementsByClassName('trade-range')[0].addEventListener('mouseleave', () => {
	document.getElementsByClassName('trade-range')[0].style.backgroundColor = null;
	document.getElementsByClassName('trade-range')[0].style.opacity = null;
});
function createList(newdata) {
	let nameHeader = document.createElement('div');
	nameHeader.innerText = 'Exchange';
	nameHeader.setAttribute('id', 'name-list');
	let volumeHeader = document.createElement('div');
	volumeHeader.innerText = 'Volume';
	volumeHeader.setAttribute('id', 'volume-list');
	let countryHeader = document.createElement('div');
	countryHeader.innerText = 'Country';
	countryHeader.setAttribute('id', 'country-list');
	for (let i = 0; i < newdata.length; i++) {
		let listItemContainer = document.createElement('div');
		listItemContainer.className = 'list-item-wrapper';
		let nameExchange = document.createElement('div');
		nameExchange.className = 'exchange-name';
		// let link = document.createElement('a');
		// link.setAttribute('href', `${newdata[i]['url']}`);
		// link.target = 'blank';

		nameExchange.innerHTML = newdata[i]['name'];
		let volumeExchange = document.createElement('div');
		volumeExchange.className = 'volume';
		volumeExchange.textContent = Math.round(newdata[i]['trade_volume_24h_btc'], 0);
		let countryOfOrigin = document.createElement('div');
		countryOfOrigin.className = 'country';
		if (newdata[i]['country']) {
			countryOfOrigin.textContent = newdata[i]['country'];
		} else {
			countryOfOrigin.textContent = 'country not specified';
		}

		nameHeader.appendChild(nameExchange);
		volumeHeader.appendChild(volumeExchange);
		countryHeader.appendChild(countryOfOrigin);
	}
	listParent.appendChild(nameHeader);
	listParent.appendChild(volumeHeader);
	listParent.appendChild(countryHeader);
}
document.getElementsByClassName('trade-range')[0].addEventListener('click', () => {
	if (listParent) {
		listParent.removeChild;
		removeAllChildren(listParent);
	}

	fetch('https://api.coingecko.com/api/v3/exchanges')
		.then((resp) => {
			return resp.json();
		})
		.then(function(data) {
			let newdata = data
				.filter((el) => el['trade_volume_24h_btc'] <= 3000)
				.sort((b, a) => a['trade_volume_24h_btc'] - b['trade_volume_24h_btc']);

			createList(newdata);
		});
	// .then(() => {
	// 	let list = document.getElementsByTagName('li');
	// 	for (let tag of list) {
	// 		let iconBtn = document.createElement('button');
	// 		iconBtn.className = 'icon-btn';
	// 		iconBtn.innerHTML = 'show icon';
	// 		tag.appendChild(iconBtn);
	// 	}
	// });
});
document.getElementsByClassName('trade-range')[1].addEventListener('mouseenter', () => {
	let index = Math.floor(Math.random() * (colors.length - 1));
	document.getElementsByClassName('trade-range')[1].style.backgroundColor = colors[index];
	document.getElementsByClassName('trade-range')[1].style.opacity = 0.65;
});
document.getElementsByClassName('trade-range')[1].addEventListener('mouseleave', () => {
	document.getElementsByClassName('trade-range')[1].style.backgroundColor = null;
	document.getElementsByClassName('trade-range')[1].style.opacity = null;
});
document.getElementsByClassName('trade-range')[1].addEventListener('click', () => {
	if (listParent) {
		removeAllChildren(listParent);
	}
	fetch('https://api.coingecko.com/api/v3/exchanges')
		.then((resp) => {
			return resp.json();
		})
		.then(function(data) {
			let newdata = data
				.filter((el) => el['trade_volume_24h_btc'] > 3001 && el['trade_volume_24h_btc'] <= 10000)
				.sort((b, a) => a['trade_volume_24h_btc'] - b['trade_volume_24h_btc']);
			createList(newdata);
		});
});
document.getElementsByClassName('trade-range')[2].addEventListener('mouseenter', () => {
	let index = Math.floor(Math.random() * (colors.length - 1));
	document.getElementsByClassName('trade-range')[2].style.backgroundColor = colors[index];
	document.getElementsByClassName('trade-range')[2].style.opacity = 0.65;
});
document.getElementsByClassName('trade-range')[2].addEventListener('mouseleave', () => {
	document.getElementsByClassName('trade-range')[2].style.backgroundColor = null;
	document.getElementsByClassName('trade-range')[2].style.opacity = null;
});
document.getElementsByClassName('trade-range')[2].addEventListener('click', () => {
	if (listParent) {
		removeAllChildren(listParent);
	}
	fetch('https://api.coingecko.com/api/v3/exchanges')
		.then((resp) => {
			return resp.json();
		})
		.then(function(data) {
			let newdata = data
				.filter((el) => el['trade_volume_24h_btc'] > 10000)
				.sort((b, a) => a['trade_volume_24h_btc'] - b['trade_volume_24h_btc']);

			createList(newdata);
		});
});
let convertField = document.createElement('input');
convertField.setAttribute('id', 'input');
let outputField = document.createElement('output');
outputField.setAttribute('id', 'conversion-output');
outputField.textContent = 'result';
let chooseCurrency = document.createElement('button');
chooseCurrency.setAttribute('id', 'currency');

let convertText = document.createElement('div');
convertText.innerText = 'BTC convert to';
convertText.setAttribute('id', 'conversion-text');
chooseCurrency.appendChild(convertText);
chooseCurrency.addEventListener('click', checkFetch);
document.getElementById('crypto-converter').appendChild(convertField);
document.getElementById('crypto-converter').appendChild(chooseCurrency);
document.getElementById('crypto-converter').appendChild(outputField);

function getCurrentRates() {
	fetch('https://api.coingecko.com/api/v3/exchange_rates').then((resp) => resp.json()).then((rateResult) => {
		let rateArr = [];
		rateArr = Object.entries(rateResult.rates).map((el) => el[1]);

		// console.log(rateArr);
		let currencyList = document.createElement('div');
		currencyList.setAttribute('id', 'dropdown');
		rateArr.forEach((el) => {
			let listItem = document.createElement('div');
			listItem.className = 'currName';
			listItem.innerText = el.name;
			listItem.addEventListener('click', () => {
				let selectedCurrency = event.target.innerText;
				console.log(selectedCurrency);
				let textField = document.getElementById('conversion-text').innerText.split(' ');
				if (textField.length > 3) {
					textField.length = 3;
				}
				console.log(textField);

				document.getElementById('conversion-text').innerText = textField.join(' ') + ' ' + selectedCurrency;
				// document.getElementById('currency').innerText = ;
			});
			currencyList.appendChild(listItem);
		});
		document.getElementById('currency').appendChild(currencyList);

		// makeConversion();
	});
}
function makeConversion() {
	let currentCurrency = document.getElementById('conversion-text');
	if (currentCurrency.innerText.split(' ').length === 3) {
		document.getElementById('conversion-output').innerText = 'no currency chosen';
	} else {
		let choosenCurrency = currentCurrency.innerText.split(' ').filter((el, index) => index > 2);
		fetch('https://api.coingecko.com/api/v3/exchange_rates').then((resp) => resp.json()).then((rateResult) => {
			let rateArr = [];
			rateArr = Object.entries(rateResult.rates).map((el) => el[1]);
			// console.log(rateArr);
			let exchangeRate = rateArr.filter((el) => el.name === choosenCurrency.join(' '))[0].value;
			// console.log(exchangeRate[0].value);
			let amountToConvert = +document.getElementById('input').value;
			// console.log(amountToConvert);
			if (!!amountToConvert === true && amountToConvert > 0) {
				let result = Math.floor(amountToConvert * exchangeRate, 0);
				document.getElementById('conversion-output').innerText = result;
			}
			// console.log(choosenCurrency.join(' '));
		});
	}
}
function checkFetch() {
	let currentCurrency = document.getElementById('currency');
	if (currentCurrency.innerText.split(' ').length === 3) {
		getCurrentRates();
	} else {
		makeConversion();
	}
}
