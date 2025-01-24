let counterIng = 0;
let counterInst = 0;
document.querySelector("#btn-add-ing").addEventListener("click", () => {
	counterIng++;
	let newIngredient = document.createElement("div");
	newIngredient.classList.add('mb-3');
	let ingredientNumber = document.createElement("div");
	ingredientNumber.classList.add("mb-1");
	ingredientNumber.classList.add('d-flex', 'justify-content-between');
	let ingredientNumberText = document.createElement("span");
	ingredientNumberText.innerText = `Ingredient ${counterIng + 1}:`;

	let ingredientDelete = document.createElement("span");
    ingredientDelete.classList.add('float-end"');
	ingredientDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#deleteEditModal"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></svg>`;
	ingredientNumber.appendChild(ingredientNumberText);
	ingredientNumber.appendChild(ingredientDelete);
	newIngredient.appendChild(ingredientNumber);

	let inputGroup1 = document.createElement("div");
	inputGroup1.classList.add("input-group", 'mb-1');
	let inputGroup1Text = document.createElement("span");
	inputGroup1Text.classList.add("input-group-text");
	inputGroup1Text.innerText = "Amount / Unit";
	inputGroup1.appendChild(inputGroup1Text);

	let amountInput = document.createElement("input");
	amountInput.setAttribute("type", "text");
	amountInput.classList.add("form-control");
	amountInput.setAttribute("name", "recipe[ingredient[amount]]");
	amountInput.setAttribute("placeholder", 1);
	inputGroup1.appendChild(amountInput);

	let unitInput = document.createElement("input");
	unitInput.setAttribute("type", "text");
	unitInput.classList.add("form-control");
	unitInput.setAttribute("name", "recipe[ingredient[unit]]");
	unitInput.setAttribute("placeholder", "cup");
	inputGroup1.appendChild(unitInput);

	let inputGroup2 = document.createElement("div");
	inputGroup2.classList.add("input-group", 'mb-1');
	let inputGroup2Text = document.createElement("span");
	inputGroup2Text.classList.add("input-group-text");
	inputGroup2Text.innerText = "Ingredient";
	inputGroup2.appendChild(inputGroup2Text);

	let ingredientInput = document.createElement("input");
	ingredientInput.setAttribute("type", "text");
	ingredientInput.classList.add("form-control");
	ingredientInput.setAttribute("name", "recipe[ingredient[name]]");
	ingredientInput.setAttribute("placeholder", "milk");
	ingredientInput.required = true;
	inputGroup2.appendChild(ingredientInput);

	let inputGroup3 = document.createElement("div");
	inputGroup3.classList.add("input-group");
	let inputGroup3Text = document.createElement("span");
	inputGroup3Text.classList.add("input-group-text");
	inputGroup3Text.innerText = "Notes";
	inputGroup3.appendChild(inputGroup3Text);

	
	let notesInput = document.createElement("textarea");
	notesInput.classList.add("form-control");
	notesInput.setAttribute("id", "title");
	notesInput.setAttribute("name", "recipe[ingredient[notes]]");
	notesInput.setAttribute("placeholder", "we reccomend using 2% milk");
    inputGroup3.appendChild(notesInput);

	newIngredient.appendChild(inputGroup1);
	newIngredient.appendChild(inputGroup2);
	newIngredient.appendChild(inputGroup3);
	document.querySelector("#ingredient-list").appendChild(newIngredient);
});

document.querySelector('#btn-add-inst').addEventListener("click", () => {
	counterInst++;
	let newStep = document.createElement("div");
	newStep.classList.add('mb-3');
	let stepNumber = document.createElement("div");
	stepNumber.classList.add("mb-1");
	stepNumber.classList.add('d-flex', 'justify-content-between');
	let stepNumberText = document.createElement("span");
	stepNumberText.innerText = `Step ${counterInst + 1}:`;

	let stepDelete = document.createElement("span");
    stepDelete.classList.add('float-end"');
	stepDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#deleteEditModal"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></svg>`;
	stepNumber.appendChild(stepNumberText);
	stepNumber.appendChild(stepDelete);
	newStep.appendChild(stepNumber);

	let stepInput = document.createElement("input");
	stepInput.setAttribute("type", "text");
	stepInput.classList.add("form-control");
	stepInput.setAttribute("name", `recipe[instructions[${counterInst}]]`);
	stepInput.required = true;
	newStep.appendChild(stepInput);
	document.querySelector('#instructions-list').appendChild(newStep);
});

// <div class="mb-3">
// 	<span class="">Recipe Instructions</span><br>
// 	<div class="mt-3">
// 		<div class="mb-1"><span>Step 1:</span></div>
// 		<input class="form-control" type="text" 
// name="recipe[instructions[1]]" required/>
// 	</div>
// </div>
