import axios from 'axios';

import { FIREBASE_REFERENCE_URL } from '@env';

export async function storeExpense(expenseData) {
	const response = await axios.post(FIREBASE_REFERENCE_URL + '/expenses.json', expenseData);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const response = await axios.get(FIREBASE_REFERENCE_URL + '/expenses.json');

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description
		};

		expenses.push(expenseObj);
	}

	return expenses;
}
