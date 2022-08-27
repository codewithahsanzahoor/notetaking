let addBtn = document.getElementById('addBtn');
let noteHead = document.getElementById('noteHeadType');
let noteBody = document.getElementById('addTxt');
let cardParent = document.getElementById('notes');
let cardTxt = document.createElement('div');
cardTxt.setAttribute('id', 'cardTxt');
cardParent.appendChild(cardTxt);

showNote();

if (noteHead.value == '' && noteBody.value == '') {
	noteHead.style.fontWeight = 'bold';
	noteHead.innerText = 'Type to Add Note Title:';
	noteBody.style.fontWeight = 'bold';
	noteBody.innerText = 'Type to Add Note Description:';
}
noteHead.addEventListener('click', function () {
	noteBody.innerText = '';
	noteHead.innerText = '';
});

addBtn.addEventListener('click', function () {
	let bodyText = localStorage.getItem('bodyText');
	let headText = localStorage.getItem('headText');
	//NOTE: ADDING TEXT OF HEAD TO LOCALSTORAGE:
	if (headText == null) {
		objHead = [];
	} else {
		objHead = JSON.parse(headText);
	}
	objHead.push(noteHead.value);
	localStorage.setItem('headText', JSON.stringify(objHead));

	//NOTE: ADDING TEXT OF CARD TO LOCALSTORAGE:
	if (bodyText == null) {
		objBody = [];
	} else {
		objBody = JSON.parse(bodyText);
	}
	objBody.push(noteBody.value);
	localStorage.setItem('bodyText', JSON.stringify(objBody));

	showNote();
});

//NOTE: SHOWNOTE() FOR SHOWING IT IN YOUR NOTES SECTION
function showNote() {
	let bodyText = localStorage.getItem('bodyText');
	let headText = localStorage.getItem('headText');
	let objBodyS = JSON.parse(bodyText);
	let objHeadS = JSON.parse(headText);
	let html = ``;
	if (objBodyS != null && objHeadS != null) {
		objBodyS.forEach(function (element, index) {
			const bodyText1 = objBodyS[index];
			const headText1 = objHeadS[index];
			html += `
        <div class="card noteCard" style="width: 18rem;">
          <div class="card-body cardBody" >
            <h5 class="card-title">${headText1}</h5>
            <div class="card-text">${bodyText1}</div>
						<button class="btn btn-primary" onclick="delNote(this.id)" id="${index}">Delete Note</button>
          </div>
        </div>
        `;
		});
	}
	cardTxt.innerHTML = html;
}

//NOTE: ADDING DEL NOTE FEATURE by using function
function delNote(index) {
	let bodyText = localStorage.getItem('bodyText');
	let headText = localStorage.getItem('headText');
	let objBodyS = JSON.parse(bodyText);
	let objHeadS = JSON.parse(headText);
	objBodyS.splice(index, 1);
	objHeadS.splice(index, 1);
	localStorage.setItem('bodyText', JSON.stringify(objBodyS));
	localStorage.setItem('headText', JSON.stringify(objHeadS));
	showNote();
}

//NOTE: ADDING SEARCH FUNCTIONALITY
let searchText = document.getElementById('searchTxt');
searchText.addEventListener('input', function () {
	let search = searchText.value.toLowerCase();
	let innerAllCards = document.getElementsByClassName('noteCard');
	Array.from(innerAllCards).forEach(function (element, index) {
		let headText = element.getElementsByTagName('h5')[0].innerText;
		let bodyText = element.querySelectorAll('div.card-text')[0].innerText;
		if (headText.includes(search) || bodyText.includes(search)) {
			element.style.display = 'block';
			element.style.color = 'red';
		} else {
			element.style.display = 'none';
		}
	});
	if (search == '') {
		showNote();
	}
});
