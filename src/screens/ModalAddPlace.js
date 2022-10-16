import React, { useContext } from 'react';
import { push, ref } from 'firebase/database';
import { database } from '../firebase/config';
import { Button, TextInput } from 'react-native-paper';
import {
  SafeAreaView,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  ScrollView,
  LogBox,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import { uploadPlacePhoto } from '../firebase/storage';
import { Image } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { colors } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';

async function getFileFromUrl(url) {
  const response = await fetch(url);
  return response.blob();
}

const ModalAddPlace = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: 'Museums', value: 'Museums' },
    { label: 'Sports Center', value: 'Sports Center' },
    { label: 'Stadium', value: 'Stadium' },
    { label: 'Restaurant', value: 'Restaurant' },
    { label: 'Churches', value: 'Churches' },
    { label: 'Hospital', value: 'Hospital' },
    { label: 'Historical landmark', value: 'Historical landmark' },
    { label: 'Distinctive buildings', value: 'Distinctive buildings' },
    { label: 'Tourist attractions', value: 'Tourist attractions' },
  ]);
  const [image, setImage] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [newPoi, setNewPoi] = React.useState();

  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const lat = currentLocation?.coords?.latitude;
  const long = currentLocation?.coords?.longitude;

  const onSetNewPoiAddress = e => {
    setNewPoi({ coordinate: e.nativeEvent.coordinate });
  };

  const handleSave = async () => {
    let url = '';
    if (image && image.base64) {
      url = await uploadPlacePhoto(image.blob, image.fileName);
    }

    const extra_data = {
      featured: false,
      name,
      description,
      phone,
      email,
      website,
      image: url,
      coordinate: newPoi
        ? { ...newPoi.coordinate }
        : { latitude: lat, longitude: long },
      address,
      category: category?.value || 'Museums',
    };
    const reference = ref(database, 'places/');
    push(reference, extra_data).then(() => {
      navigation.navigate('Home');
    });
  };

  const handleChoosePhoto = React.useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await ImagePicker.launchImageLibrary(options);
    const fileName = result?.assets && result.assets[0].fileName;
    const uri = result?.assets && result.assets[0].uri;
    const base64 = result?.assets && result.assets[0].base64;
    const blob = await getFileFromUrl(uri);
    console.log({ blob });
    setImage({ uri, base64, fileName, blob });
  }, []);

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.mainFrame}>
      <ScrollView>
        <SafeAreaView style={styles.pageContentFrame}>
          <View style={styles.headerUserInfo}>
            <View style={styles.headerUserInfo_avatarFrame}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 100, height: 100 }}
              />
              <TouchableNativeFeedback onPress={handleChoosePhoto}>
                <Avatar.Icon
                  size={35}
                  style={styles.headerUserInfo_profileChangeAvatar}
                  icon="camera"
                />
              </TouchableNativeFeedback>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 100 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Name</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="Acropolis Museum"
                outlineColor="#efefef"
                style={styles.input}
                mode="outlined"
                onChangeText={setName}
                value={name}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Description</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="The Acropolis Museum is an archaeological museum focused on the findings of the archaeological site of the Acropolis of Athens."
                outlineColor="#efefef"
                multiline
                style={styles.inputMultiline}
                mode="outlined"
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Email</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="info@theacropolismuseum.gr"
                outlineColor="#efefef"
                style={styles.input}
                mode="outlined"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Phone</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="210 0900 0900"
                outlineColor="#efefef"
                style={styles.input}
                mode="outlined"
                onChangeText={setPhone}
                value={phone}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Website</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="theacropolismuseum.gr"
                outlineColor="#efefef"
                style={styles.input}
                mode="outlined"
                onChangeText={setWebsite}
                value={website}
              />
            </View>
          </View>

          <View
            style={[styles.editTextFrame, { marginTop: 20, marginBottom: 5 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Category</Text>
            </View>
          </View>

          <View
            style={[styles.editInputFrame, { marginTop: 20, marginBottom: 5 }]}>
            <View style={styles.frameCentered}>
              <DropDownPicker
                placeholder="Select a category"
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                style={{ borderColor: '#efefef' }}
                dropDownContainerStyle={{ borderColor: '#efefef' }}
                searchTextInputStyle={{ borderColor: '#efefef' }}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: open ? 220 : 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.headerUserInfo_nameText}>Location</Text>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Address</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                placeholder="Dionysiou Areopagitou 15, Athina 117 42"
                outlineColor="#efefef"
                style={styles.input}
                mode="outlined"
                onChangeText={setAddress}
                value={address}
              />
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              showsUserLocation
              showsMyLocationButton
              onPress={e => onSetNewPoiAddress(e)}>
              {newPoi && (
                <Marker
                  coordinate={newPoi.coordinate}
                  onDrag={e => onSetNewPoiAddress(e)}
                  draggable
                />
              )}
            </MapView>
          </View>
        </SafeAreaView>
      </ScrollView>

      <View style={styles.bottomButtonFrame}>
        <Button
          onPress={handleSave}
          style={styles.bottomButton}
          mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 8.5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeee',
  },
  headerBarLeft: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerBarMiddle: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerBarText: {
    paddingBottom: 17,
    color: 'black',
    fontSize: 17,
    // fontFamily: 'Roboto-Regular',
  },
  headerBarRight: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  pageContentFrame: {
    backgroundColor: 'white',
    marginTop: 30,
  },
  headerUserInfo: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerUserInfo_avatarFrame: {
    justifyContent: 'center',
    marginTop: 100,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerUserInfo_avatar: {
    backgroundColor: '#e0e0e0',
  },
  headerUserInfo_profileChangeAvatar: {
    top: 80,
    position: 'absolute',
  },
  headerUserInfo_texts: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  headerUserInfo_nameText: {
    fontSize: 23,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
    marginBottom: 5,
  },
  headerUserInfo_emailText: {
    color: '#727987',
    fontSize: 14,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
  },
  editTextFrame: {
    width: '100%',
    alignItems: 'center',
  },
  frameCentered: {
    width: '85%',
  },
  inputText: {
    marginLeft: 3,
    fontSize: 14.5,
    color: '#2f3030',
  },
  editInputFrame: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
  },
  inputMultiline: {
    backgroundColor: 'white',
    height: 120,
  },
  editRowInputFrame: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editRowInputFrameCentered: {
    width: '50%',
  },
  editRowInputView: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  editRowWidth: {
    width: '50%',
  },
  genderInputFrame: {
    marginTop: 10,
    paddingBottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  genderInputView: {
    borderRadius: 5,
    width: '85%',
    borderWidth: 1,
    borderColor: '#efefef',
  },
  genderText: {
    color: '#2f3030',
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 400,
    padding: 25,
    marginBottom: 25,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default ModalAddPlace;
