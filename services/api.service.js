import axios from 'axios';
import { getKeyValue, TOKEN_DICTINARY } from './storage.service.js'


export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};


export const getWeather = async () => {
	const token = await getKeyValue(TOKEN_DICTINARY.token);
	const city = await getKeyValue(TOKEN_DICTINARY.city);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
	}
	let { data } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});
	return getTrueWeather(token, data[0].lat, data[0].lon );
};


const getTrueWeather = async (token, lat, lon) => {
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat: lat,
			lon: lon,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});
	return data;
};