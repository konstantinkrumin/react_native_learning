import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowAlert: true
		};
	}
});

export default function App() {
	const [pushToken, setPushToken] = useState('');

	useEffect(() => {
		async function congigurePushNotifications() {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;

			if (finalStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				Alert.alert(
					'Permission required',
					'Push notifications need the appropriate permissions.'
				);

				return;
			}

			const pushTokenData = await Notifications.getExpoPushTokenAsync();
			setPushToken(pushTokenData.data);

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.DEFAULT
				});
			}
		}

		congigurePushNotifications();
	}, []);

	useEffect(() => {
		const subsription1 = Notifications.addNotificationReceivedListener(notification => {
			console.log('NOTIFICATION RECEIVED');
			console.log(notification);

			const userName = notification.request.content.data.userName;
			console.log(userName);
		});

		const subsription2 = Notifications.addNotificationResponseReceivedListener(response => {
			console.log('NOTIFICATION RESPONSE RECEIVED');
			console.log(response);

			const userName = notification.request.content.data.userName;
			console.log(userName);
		});

		return () => {
			subsription1.remove();
			subsription2.remove();
		};
	}, []);

	function scheduleNotificationHandler() {
		Notifications.scheduleNotificationAsync({
			content: {
				title: 'My first local notification',
				body: 'This is the body of the notification.',
				data: {
					userName: 'Costa'
				}
			},
			trigger: {
				seconds: 5
			}
		});
	}

	function sendPushNotificationHandler() {
		fetch('https://expo.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				to: pushToken,
				title: 'Test - send from a device!',
				body: 'This is a test!'
			})
		});
	}

	return (
		<View style={styles.container}>
			<Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
			<Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
