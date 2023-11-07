import { fetchRawMealData } from './index.js';
document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('wrapper');
    const searchBtn = document.getElementById('searchButton');
    const error = document.getElementById('error');
    const userInput = document.getElementById('recipeInput');
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    error.style.display = 'none';
    searchBtn.addEventListener('click', async () => {
        const inputValue = userInput.value;
        if (inputValue.length == 0) {
            error.style.display = 'block';
        } else {
            let searchQuery = inputValue;
            fetchMealData(searchQuery);
        }
    });
    
    async function fetchMealData(searchQuery) {
        try {
            const response = await fetch(url + searchQuery);
            const data = await response.json();
            
            result.innerHTML = '';
            
            if (data.meals) {
                data.meals.forEach((myMeal) => {
                    
                    const showRecipeButton = document.createElement('button');
                    showRecipeButton.className = 'myBtn showRecipee';
                    showRecipeButton.textContent = 'Show Recipe';
                    
                    const detailCard = document.createElement('div');
                    detailCard.className = 'detail-card';
                    detailCard.innerHTML = `
                    <img class="detail-img" src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}">
                    <div class="detail-desc">
                    <div class="detail-name">
                    <h4>${myMeal.strMeal}</h4>
                    <p class="detail-sub">${myMeal.strArea}</p>
                    </div>
                    </div>
                    `;
                    
                    detailCard.querySelector('.detail-desc').appendChild(showRecipeButton);
                    
                    showRecipeButton.addEventListener('click', () => {
                        window.location.href = `recipe.html?q=${myMeal.strMeal}`;
                    });
                    
                    result.appendChild(detailCard);
                });
            } else {
                result.innerHTML = '<p>No meals found for the given query.</p>';
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    
    fetchRawMealData();
});
async function fetchSelectedMealData(searchQuery) {
    const result = document.getElementById('wrapper');
    const recipeeInstructions = document.getElementById('recipeeInstructions');
    const recipeeIngredients = document.querySelector('.recipee-ingredients');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        let myMeal = data.meals;

        for (let i = 0; i < myMeal.length; i++) {
            let meal = myMeal[i];
            let count = 1;
            let ingredients = [];
            // craete a div for instruction
            const instructionDiv = document.createElement("div");
            instructionDiv.className = "instructionDiv";
            // split the instruction into separate steps
            const steps = meal.strInstructions.split('\r\n');
            steps.forEach((step) => {
                const instructionParagraph = document.createElement("p");
                instructionParagraph.textContent = step;
                instructionDiv.appendChild(instructionParagraph);
            });
            recipeeInstructions.appendChild(instructionDiv);

            for (let j = 1; j <= 24; j++) {
                if (meal['strIngredient' + j]) {
                    ingredients.push(`${meal['strMeasure' + j]} ${meal['strIngredient' + j]}`);
                }
            }
            console.log(ingredients);
            const formattedInstructions = steps.join('<br>');
            recipeeInstructions.innerHTML = formattedInstructions;

            let ingredientsList = '<h3>The Ingredients Are:</h3><ul>';
            ingredients.forEach((ingredient) => {
                ingredientsList += `<li>${ingredient}</li>`;
            });
            ingredientsList += '</ul>';
            recipeeIngredients.innerHTML = ingredientsList;
            
        }
        
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export { fetchSelectedMealData };