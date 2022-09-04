import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';

import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';

function MealDetailScreen({ route, navigation }) {
	const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
	const dispatch = useDispatch();

	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	const mealIsFavorite = favoriteMealIds.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			dispatch(removeFavorite({ id: mealId }));
		} else {
			dispatch(addFavorite({ id: mealId }));
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						icon={mealIsFavorite ? 'star' : 'star-outline'}
						color="white"
						onPress={changeFavoriteStatusHandler}
					/>
				);
			}
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<ScrollView style={styles.rootContainer}>
			<Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<MealDetails
				duration={selectedMeal.duration}
				complexity={selectedMeal.complexity}
				affordability={selectedMeal.affordability}
				textStyle={styles.detailText}
			/>
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle children="Ingredients" />
					<List data={selectedMeal.ingredients} />

					<Subtitle children="Steps" />
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 30
	},
	image: {
		width: '100%',
		height: 350
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white'
	},
	detailText: {
		color: 'white'
	},
	listOuterContainer: {
		alignItems: 'center'
	},
	listContainer: {
		maxWidth: '80%'
	}
});
