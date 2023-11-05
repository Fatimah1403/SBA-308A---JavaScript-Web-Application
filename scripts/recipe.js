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
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}