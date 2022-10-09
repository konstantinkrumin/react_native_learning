import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

import { GlobalStyles } from '../constants/styles';

import { ExpensesContext } from '../store/expense-context';

function ManageExpense({ route, navigation }) {
	const expensesCtx = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={isEditing ? 'Update' : 'Add'}
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center'
	}
});
