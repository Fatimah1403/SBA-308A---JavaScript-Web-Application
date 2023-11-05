const countryDropdown = document.getElementById("countryDropdown");
const url = 'https://hotels4.p.rapidapi.com/v2/get-meta-data';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b7e3501e02msh78cdf2a4c9ec5c8p173bf1jsna264f6bed3d4',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
    if (response.ok) {
        let result = await response.json();
        for (let countryCode in result) {
            const option = document.createElement("option");
            option.value = countryCode;
            option.textContent = countryCode;
            countryDropdown.appendChild(option);
        }
    } else {
        console.error("Failed to fetch the data.")
    }
	console.log(result);
} catch (error) {
	console.error(error);
}