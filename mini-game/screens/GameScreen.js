import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title';

function GameScreen() {
	return (
		<View style={styles.screen}>
			<View>
				<Title>Opponent's Guess</Title>
				<Text>Higher or lower?</Text>
			</View>
			<View></View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24
	}
});
