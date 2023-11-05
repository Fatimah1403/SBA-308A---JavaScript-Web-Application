const recipeDropdown = document.getElementById("recipeDropdown")
// Create a function to fetch data from the Yummly API
async function fetchData() {
    const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b7e3501e02msh78cdf2a4c9ec5c8p173bf1jsna264f6bed3d4',
            'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            
            for (const recipeDetails in data) {
                const option = document.createElement("option");
                option.value = recipeDetails
                option.textContent = recipeDetails;
                recipeDropdown.appendChild(option);
            }
        } else {
            throw new Error('Failed to fetch the data');
        }
    } catch (error) {
        console.error(error);
    }
}
fetchData();
function populateFeedInfo(feeds) {
    const detailName = document.querySelector('.detail-name, .detail-card');

   detailName.innerHTML = `
    <h4>${feeds}</h4>
   `
}
// Export a default function to fetch and manipulate data
export default async function manipulateYummlyData() {
    const yummlyData = await fetchData();
    if (yummlyData) {
        // You can manipulate the yummlyData here as needed
        // For example, you can filter, transform, or display the data
        console.log(yummlyData);
    }
}
