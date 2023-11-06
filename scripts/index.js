// const recipeDropdown = document.getElementById("recipeDropdown")
// // Create a function to fetch data from the Yummly API
// async function fetchData() {
//     const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'b7e3501e02msh78cdf2a4c9ec5c8p173bf1jsna264f6bed3d4',
//             'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         if (response.ok) {
//             const data = await response.json();
            
//             for (const recipeDetails in data) {
//                 const option = document.createElement("option");
//                 option.value = recipeDetails
//                 option.textContent = recipeDetails;
//                 recipeDropdown.appendChild(option);
//             }
//         } else {
//             throw new Error('Failed to fetch the data');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
// fetchData();
// function populateFeedInfo(feeds) {
//     const detailName = document.querySelector('.detail-name, .detail-card');

//    detailName.innerHTML = `
//     <h4>${feeds[0].content}</h4>
//     <p>${feeds[0].details}</P>
//    `
//    // want to add others but not getting d object due to the subscription problem
// }

// export default async function manipulateYummlyData() {
//     const feedData = await fetchData();
//     if (feedData) {
//         // want to manipulate this function.
//         console.log(feedData);
//     }
// }
function getRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}
async function fetchRawMealData() {
    const result = document.getElementById('wrapper');

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${getRandomLetter()}`;
    try {
        const response = await fetch(url);
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

export { fetchRawMealData };
