/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import { useAuthDispatch, useAuthState } from '../utilities/auth/AuthContext';
import AuthNavigator from './AuthNavigator';
import ReviewModal from '../screens/modals/ReviewModal';
import FilterModal from '../screens/modals/FilterModal';
import UpdateReviewScreen from '../screens/UpdateReviewScreen';
import CameraScreen from '../screens/CameraScreen';

export default function Navigator(){
  const Stack = createStackNavigator();  
  const { isLoading, isSignOut, userToken } = useAuthState();
  const dispatch = useAuthDispatch();

    React.useEffect(() => {
      const bootstrapAsync = async () => {
        let token = null;
        try{
          token = await AsyncStorage.getItem('@userKey');
        } catch (e) {
          console.log('error', e)
        }
        dispatch({type: 'RESTORE_TOKEN', token});
      };
      bootstrapAsync();
    }, [dispatch]);
    
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            mode="modal" 
            screenOptions={{
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
              }),
            }}  
          >
            {isLoading && (
              <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false}} />
            )}
            {!isLoading && userToken == null ? (
              <Stack.Screen  isSignout={isSignOut} name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            ) : (
                <>
                  <Stack.Screen name="main" component={TabNavigator} options={{headerShown:false}} />
                  <Stack.Screen name="modal" component={ReviewModal} options={{headerShown:false,cardStyle:{backgroundColor: 'transparent', opacity: 2}}} />
                  <Stack.Screen name="filterModal" component={FilterModal} options={{headerShown: false}} />
                  <Stack.Screen name="updateReview" component={UpdateReviewScreen} options={{headerShown: true, headerTitle:'Update Review'}}/>
                  <Stack.Screen name="camera" component={CameraScreen} mode='card' options={{headerStyle:{backgroundColor:'black'}, headerTitle:'',headerTintColor:'white'}} />
                </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}


