// import * as Mainfunc from "./scripts/index.js"
import { fetchSelectedMealData } from './myscript.js';

const urlSearchParams = new URLSearchParams(window.location.search);
const urlQuery = urlSearchParams.get("q");

const recipeeName = document.querySelector('.recipee-name')
recipeeName.textContent = urlQuery

fetchSelectedMealData(urlQuery);