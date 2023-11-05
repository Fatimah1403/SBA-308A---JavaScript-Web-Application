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
	let result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}