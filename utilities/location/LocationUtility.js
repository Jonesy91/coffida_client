
import { PermissionsAndroid } from 'react-native'; 
import { getDistance, convertDistance } from 'geolib';

/* 
this function will check if the user has already granted permissions to access
the  devices location. if not then a prompt will be displayed.
*/
const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        return false;
    } catch (err) {
        return err;
    }
  }

/* 
Calculates the distance between two points and returns the result
in kilometres. the two points should be the device and a shop.
*/
const calculateDistance = (device, shop) => {
    let distance = getDistance(device, shop);
    distance = convertDistance(distance, 'km');
    return distance;
}

export { requestLocationPermission, calculateDistance }