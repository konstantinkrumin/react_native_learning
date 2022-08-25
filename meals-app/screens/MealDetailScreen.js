import { Text } from 'react-native';

function MealDetailScreen({ route }) {
	const mealId = route.params.mealId;

	return <Text>Meal Detail Screen ({mealId})</Text>;
}

export default MealDetailScreen;
