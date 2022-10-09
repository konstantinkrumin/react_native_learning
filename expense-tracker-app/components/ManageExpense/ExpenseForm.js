import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Input from './Input';

function ExpenseForm() {
	const [inputValues, setInputValues] = useState({
		amount: '',
		date: '',
		description: ''
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues(curInputValues => {
			return {
				...curInputValues,
				[inputIdentifier]: enteredValue
			};
		});
	}

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					label="Amount"
					style={styles.rowInput}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputChangedHandler.bind(this, 'amount'),
						value: inputValues.amount
					}}
				/>
				<Input
					label="Date"
					style={styles.rowInput}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputChangedHandler.bind(this, 'date'),
						value: inputValues.date
					}}
				/>
			</View>

			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, 'description'),
					value: inputValues.description
				}}
			/>
		</View>
	);
}

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 40
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center'
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowInput: {
		flex: 1
	}
});
