export const getArgs = (args) => {
	const response = {};
	const [executer, file, ...rest] = args;
	rest.forEach((value, index, array) => {
		if (value.charAt(0) == '-') {
			if (index == array.length - 1) {
				response[value.substring(1)] = true;
			} else if (array[index+1].charAt(0) != '-') {
				response[value.substring(1)] = array[index + 1]
			} else {
				response[value.substring(1)] = true;
			}
		}
	});
	return response;
};
