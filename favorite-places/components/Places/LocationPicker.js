import { useEffect, useState } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getMapPreview } from '../../util/location';

function LocationPicker() {
	const [pickedLocation, setPickedLocation] = useState();
	const isFocused = useIsFocused();

	const route = useRoute();
	const navigation = useNavigation();
	const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = route.params && {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng
			};

			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	async function verifyPermissions() {
		if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient Permissions!',
				'You need to grant location permissions to use this app.'
			);

			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.lat,
			lng: location.coords.lng
		});
	}

	function pickOnMapHandler() {
		navigation.navigate('Map');
	}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.image}
				source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: 'hidden'
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	}
});
