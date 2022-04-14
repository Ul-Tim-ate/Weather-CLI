#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log_service.js'
import { saveKeyValue, TOKEN_DICTINARY } from './services/storage.service.js'

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен')
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTINARY.token, token);
		printSuccess('Токен сохранен');

	} catch (error) {
		printError(error.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передано название города')
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTINARY.city, city);
		printSuccess('Город сохранен');

	} catch (error) {
		printError(error.message);
	}
}

const getForcast = async () => {
	try {
		const weather = await getWeather();
		if ( JSON.stringify(weather) == '[]' ) {
			throw Error('Неверно указан город');
		}
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (error?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(error.message);
		}
	}
 }

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForcast();
};

initCLI();
