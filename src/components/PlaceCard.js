import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, database } from '../firebase/config';
import { ref, push, remove, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const PlaceCard = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteKey, setFavoriteKey] = useState();
  const navigation = useNavigation();
  const user = auth.currentUser;

  const addFavorites = () => {
    const reference = ref(database, 'users/' + user.uid + '/favorites');
    push(reference, {
      ...data,
    }).then(response => {
      console.log({ response });
    });
  };

  const removeFavorites = async key => {
    remove(ref(database, 'users/' + user.uid + '/favorites/' + key));
  };

  const getUserFavorites = React.useCallback(() => {
    onValue(
      ref(database, 'users/' + user.uid + '/favorites'),
      querySnapShot => {
        const result = querySnapShot.val() || {};

        for (let key in result) {
          if (result[key].id === data.id) {
            setFavoriteKey(key);
            setIsFavorite(true);
          }
        }
      },
    );
  }, [data.id, user.uid]);

  const clickLike = () => {
    getUserFavorites();

    if (isFavorite) {
      removeFavorites(favoriteKey);
      setIsFavorite(false);
    } else {
      addFavorites();
    }
  };

  const onPlaceClick = () => {
    navigation.navigate('PlaceDetailsScreen', data);
  };

  React.useEffect(() => {
    getUserFavorites();
  }, [getUserFavorites]);

  return (
    <TouchableOpacity onPress={onPlaceClick}>
      <View style={styles.mainCard}>
        <View style={styles.cardInfosFrame}>
          <Image
            resizeMode="cover"
            source={{ uri: data.image }}
            style={styles.listingCoverImage}
          />
          <View style={styles.placeTitleFrame}>
            <Text numberOfLines={1} style={styles.placeTitleText}>
              {data.name}
            </Text>
          </View>
          <View style={styles.heartIconFrame}>
            <TouchableOpacity onPress={clickLike}>
              <Icon
                size={18}
                style={styles.heartIcon}
                name={isFavorite ? 'heart' : 'heart-outline'}
                color="#ff5357"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardBottomLocationFrame}>
          <Text numberOfLines={1} style={styles.cardBottomLocationText}>
            {data?.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    width: 170,
    marginBottom: 25,
    marginRight: 20,
  },
  cardInfosFrame: {
    width: 170,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 14,
    overflow: 'hidden',
  },
  listingCoverImage: {
    width: '100%',
    height: '100%',
  },
  placeTitleFrame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeTitleText: {
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
    // fontFamily: 'MonumentExtended-Regular',
  },
  heartIconFrame: {
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  heartIcon: {
    marginRight: 10,
    marginTop: 10,
  },
  cardBottomLocationFrame: {
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottomLocationText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: 'gray',
    // fontFamily: 'Roboto-Light',
  },
});

export default PlaceCard;
