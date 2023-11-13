export const keys = {
	USER: "student_matching:user",
};

export const get_user = () => {
	const json = localStorage.getItem(keys.USER);
	if (json) {
		return JSON.parse(json);
	}

	return null;
};

export const set_user = (d = {}) => {
	localStorage.setItem(keys.USER, JSON.stringify({ ...d }));
};
export const remove_user = () => {
	localStorage.removeItem(keys.USER);
};
