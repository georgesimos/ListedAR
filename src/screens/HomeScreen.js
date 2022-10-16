import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { Avatar, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceCard from '../components/PlaceCard';
import { auth } from '../firebase/config';
import usePlaces from '../hooks/usePlaces';
import { match } from '../utils';

const HomeHeader = ({ navigation }) => {
  const user = auth.currentUser;

  return (
    <View style={styles.header}>
      <View style={styles.headerTopFrame}>
        <View style={styles.headerTopFrameLeft}>
          <Text style={styles.welcomeText}>Welcome 👋</Text>
          <Text numberOfLines={1} style={styles.userNameText}>
            {user?.displayName}
          </Text>
        </View>

        <View style={styles.headerTopFrameMiddle}>
          <Image
            style={styles.logoImage}
            resizeMode="contain"
            source={require('../assets/listed.png')}
          />
        </View>
      </View>

      <View style={styles.headerTopFrameRight}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')}>
          <Avatar.Image
            source={{ uri: user?.photoURL }}
            style={styles.avatarImage}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [places, placesByCategory] = usePlaces();
  const [searchInput, setSearchInput] = React.useState('');

  const filteredPlaces = match(searchInput, places, 'name');

  return (
    <SafeAreaView style={styles.root}>
      <HomeHeader navigation={navigation} />
      <View style={styles.searchFrame}>
        <View style={styles.searchView}>
          <TextInput
            onChangeText={setSearchInput}
            outlineColor="#efefef"
            placeholderTextColor={'#a3a3a3'}
            style={styles.searchInput}
            autoComplete="none"
            autoCapitalize="none"
            autoFocus="none"
            left={
              <TextInput.Icon name={() => <Icon name="search" size={18} />} />
            }
            mode="outlined"
            placeholder="Restaurant, Theater...."
          />
        </View>
      </View>

      <ScrollView style={{ display: searchInput.length > 1 ? 'none' : '' }}>
        <View style={styles.popularEventsFrame}>
          <View style={styles.popularEventsFrame_left}>
            <Text style={styles.popularEventsText}>Featured Places</Text>
          </View>
        </View>

        <View style={styles.populerEventsListFrame}>
          <FlatList
            onScroll={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30 }}
            horizontal={true}
            data={places}
            renderItem={({ item }) =>
              item.featured ? <PlaceCard page="Home" data={item} /> : null
            }
          />
        </View>

        {placesByCategory &&
          Object.keys(placesByCategory).map(cat => {
            return (
              <View key={cat}>
                <View style={styles.popularEventsFrame}>
                  <View style={styles.popularEventsFrame_left}>
                    <Text style={styles.popularEventsText}>{cat}</Text>
                  </View>
                </View>
                <View style={styles.eventsListTicketView}>
                  <FlatList
                    onScroll={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 30 }}
                    horizontal={true}
                    data={placesByCategory[cat]}
                    renderItem={({ item }) => (
                      <PlaceCard page="Home" data={item} />
                    )}
                  />
                </View>
              </View>
            );
          })}
      </ScrollView>

      <View
        style={[
          styles.searchResultsFrame,
          {
            display: searchInput.length > 1 ? '' : 'none',
          },
        ]}>
        <FlatList
          onScroll={false}
          contentContainerStyle={styles.searchResultFlatList}
          data={filteredPlaces}
          renderItem={({ item }) => <PlaceCard page="Home" data={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerTopFrame: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTopFrameLeft: {
    width: '60%',
    marginRight: -30,
    justifyContent: 'center',
    marginLeft: 30,
  },
  welcomeText: {
    fontSize: 22,
    // fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  userNameText: {
    fontSize: 18,
    // fontFamily: 'Roboto-Light',
  },
  headerTopFrameMiddle: {
    justifyContent: 'center',
    width: '40%',
    height: '100%',
  },
  logoImage: {
    width: '100%',
    height: 20,
  },
  headerTopFrameRight: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  avatarImage: {
    marginRight: 30,
    backgroundColor: '#e0e0e0',
  },
  searchFrame: {
    width: '100%',
    alignItems: 'center',
  },
  searchView: {
    width: '85%',
  },
  searchInput: {
    fontSize: 14,
    backgroundColor: 'white',
  },
  popularEventsFrame: {
    flexDirection: 'row',
    width: '100%',
    margin: 30,
  },
  popularEventsFrame_left: {
    width: '60%',
    height: '100%',
  },
  popularEventsText: {
    // fontFamily: 'Roboto-Medium',
  },
  popularEventsFrame_right: {
    width: '40%',
    height: '100%',
  },
  seeMoreText: {
    color: '#4256a1',
    // fontFamily: 'Roboto-Regular',
  },
  populerEventsListFrame: {
    flexDirection: 'row',
    width: '100%',
  },
  eventsListTicketView: {
    flexDirection: 'row',
    width: '100%',
    margin: 0,
    paddingBottom: 50,
  },
  searchResultsFrame: {
    width: '100%',
    alignItems: 'center',
  },
  searchResultFlatList: {
    paddingTop: 40,
    paddingBottom: 180,
  },
});

export default HomeScreen;
