
import { PermissionsAndroid } from 'react-native'; 
import { getDistance, convertDistance } from 'geolib';

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


  const calculateDistance = (device, shop) => {
      let distance = getDistance(device, shop);
      distance = convertDistance(distance, 'km');
      return distance;
  }

export { requestLocationPermission, calculateDistance }