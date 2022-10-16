import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Context as LocationContext } from '../context/LocationContext';
import Icon from 'react-native-vector-icons/Feather';
import PlaceDetailMap from '../components/PlaceDetailMap';
import { colors } from '../constants';
import getDirections from 'react-native-google-maps-directions';

const PlaceDetailsScreen = ({ route, navigation }) => {
  const {
    state: { currentLocation },
  } = React.useContext(LocationContext);

  const place = route.params;
  const [metaArr, setMetaArr] = React.useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: place.name === '' ? 'No title' : place.name,
    });
  }, [navigation, place]);

  React.useEffect(() => {
    const tempMetaArr = [];
    ['email', 'phone', 'website'].forEach(m => {
      if (place[m]) {
        tempMetaArr.push({ key: m, value: place[m] });
      }
    });
    setMetaArr(tempMetaArr);
  }, [place]);

  const handleGetDirections = () => {
    const data = {
      source: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      },
      destination: place.coordinate,
      params: [
        {
          key: 'travelmode',
          value: 'walking', // may be "driving", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  if (!place) {
    return null;
  }

  return (
    <View style={styles.mainFrame}>
      <StatusBar style="light" />

      <View style={styles.placeCoverFrame}>
        <Image
          style={styles.placeCoverImage}
          resizeMode="cover"
          source={{ uri: place.image }}
        />
      </View>

      <View style={styles.placeCoverHeight} />

      <View style={styles.placeInfoFrame}>
        <View style={styles.placeInfoView}>
          <Text style={styles.placeTitleText}> {place.name} </Text>
          <Text style={styles.placeLocationNameText}>
            <Icon name="map-pin" size={20} /> {place.address}
          </Text>

          <ScrollView style={styles.scroolViewFrame}>
            <View style={styles.placeDetailsInfoFrame}>
              <View style={styles.placeDetailsInfoView}>
                <Text style={styles.placeDescriptionText}>
                  {place.description}
                </Text>
                {metaArr
                  ? metaArr.map(meta => (
                      <Text key={meta.key} style={styles.placeMetaText}>
                        - {`${meta.key}: ${meta.value}`}
                      </Text>
                    ))
                  : null}
              </View>

              <View>
                <PlaceDetailMap
                  destination={place}
                  style={styles.mapView}
                  options={{ showsMyLocationButton: false }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomButtonFrame}>
        <Button
          onPress={handleGetDirections}
          style={styles.bottomButton}
          mode="contained">
          Get Directions
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  mapContainer: {
    position: 'absolute',
    height: '40%',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainFrame: {
    flex: 1,
  },

  headerTopFrame: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 8.5,
  },
  headerLeftFrame: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerLeftIcon: {
    paddingBottom: 15,
  },
  headerMiddleFrame: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerRightFrame: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  placeCoverFrame: {
    width: '100%',
    height: 330,
    position: 'absolute',
  },
  placeCoverImage: {
    width: '100%',
    height: '100%',
  },
  placeCoverHeight: {
    flex: 0.7,
  },

  placeInfoFrame: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 50,
    shadowOpacity: 1,
    marginTop: -40,
    flex: 1,
    backgroundColor: 'white',
    // borderTopEndRadius: 40,
    // borderTopLeftRadius: 40,
  },
  placeInfoView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  placeTitleText: {
    color: 'black',
    fontSize: 30,
  },

  placeLocationNameText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  scroolViewFrame: {
    width: '100%',
  },
  placeDetailsInfoFrame: {
    paddingBottom: 210,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeDetailsInfoView: {
    width: '85%',
    marginTop: 20,
    marginBottom: 20,
  },
  placeDescriptionText: {
    marginBottom: 10,
    fontSize: 14,
  },
  placeMetaText: {
    marginBottom: 5,
    fontSize: 13,
  },

  mapView: {
    width: Dimensions.get('window').width,
    height: 250,
    // borderRadius: 30,
  },

  bottomButtonFrame: {
    zIndex: 2,
    bottom: 20,
    position: 'absolute',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.profileEditBackground,
  },
});

export default PlaceDetailsScreen;
