import React, { useEffect, useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { calculateRegion } from 'lib/location';
import { useLocationStore } from 'store/location';
import { AAAAAA, ASH_GRAY, BBBBBB, CCCCCC, DDDDDD, EEEEEE, PRIMARY_COLOR, ZOMP } from 'constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { CityModel, CountryModel } from 'models/location.model';
import { getCities, getCountries } from 'api/location.api';
import globalStyles from 'lib/styles';
import { FriendModel } from 'models/friend.model';

function countryNameAZ( a: CountryModel, b: CountryModel ) {
  if ( a.countryName < b.countryName ){
    return -1;
  }
  if ( a.countryName > b.countryName ){
    return 1;
  }
  return 0;
}

export default function MatchHome() {
  const [ showMatchForm, setShowMatchForm ] = useState<boolean>(false);
  const {
    userLongitude,
    userLatitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
  });

  const handleOpenCreateMatchForm = () => {
    setShowMatchForm(true);
  }

  const handleCloseCreateMatchForm = () => {
    setShowMatchForm(false);
  }

  const [ countries, setCountries ] = useState<CountryModel[]>([]);
  const [isCountriesFocus, setIsCountriesFocus] = useState(false);
  const [ cities, setCities ] = useState<CityModel[]>([]);
  const [isCitiesFocus, setIsCitiesFocus] = useState(false);
  const [ friends, setFriends ] = useState<FriendModel[]>([]);
  const [isFriendsFocus, setIsFriendsFocus] = useState(false);

  const [ address, setAddress ] = useState<string>('');
  const [ chosenCountryId, setChosenCountryId ] = useState<number>();
  const [ chosenCityId, setChosenCityId] = useState<number>();
  const [ budget, setBudget ] = useState<number>(1);

  const handleChangeCountry = (thing: any) => {
    setChosenCountryId(thing.id);
    setIsCountriesFocus(false);
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries: CountryModel[] = await getCountries();
      setCountries(fetchedCountries.sort(countryNameAZ));
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async (countryId: number) => {
      const fetchedCities: CityModel[] = await getCities(countryId);
      setCities(fetchedCities);
    }
    if (chosenCountryId) {
      fetchCities(chosenCountryId);
    }
  }, [chosenCountryId]);

  return (
    <>
      <SafeAreaView style={globalStyles.safeAreaStyle}>
        <MapView
          style={localStyles.mapView}
          provider={PROVIDER_DEFAULT}
          tintColor="black"
          mapType="mutedStandard"
          showsPointsOfInterest={false}
          initialRegion={region}
          showsUserLocation={false}
          userInterfaceStyle="light"
          zoomEnabled={true}
        >
          <View style={localStyles.buttonContainer}>
            <Button
              color="white"
              onPress={handleOpenCreateMatchForm}
              title="Find Restaurant"
            />
          </View>
        </MapView>
      </SafeAreaView>
      {/* <SafeAreaView style={modalStyles.modalContainer}> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMatchForm}
        >
          <View style={modalStyles.modalView}>
            <Text>Match Settings</Text>

            <Dropdown
              style={[modalStyles.dropdown, isCountriesFocus && { borderColor: 'blue' }]}
              placeholderStyle={modalStyles.placeholderStyle}
              selectedTextStyle={modalStyles.selectedTextStyle}
              inputSearchStyle={modalStyles.inputSearchStyle}
              iconStyle={modalStyles.iconStyle}
              data={countries}
              search
              maxHeight={300}
              labelField="countryName"
              valueField="id"
              placeholder={!isCountriesFocus ? 'Country' : '...'}
              searchPlaceholder="Search"
              value={chosenCountryId}
              onFocus={() => setIsCountriesFocus(true)}
              onBlur={() => setIsCountriesFocus(false)}
              onChange={handleChangeCountry}
            />

            {
              chosenCountryId
                ? <Dropdown
                    style={[modalStyles.dropdown, isCitiesFocus && { borderColor: 'blue' }]}
                    placeholderStyle={modalStyles.placeholderStyle}
                    selectedTextStyle={modalStyles.selectedTextStyle}
                    inputSearchStyle={modalStyles.inputSearchStyle}
                    iconStyle={modalStyles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="cityName"
                    valueField="id"
                    placeholder={!isCitiesFocus ? 'City' : '...'}
                    searchPlaceholder="Search"
                    value={chosenCityId}
                    onFocus={() => setIsCitiesFocus(true)}
                    onBlur={() => setIsCitiesFocus(false)}
                    onChange={item => {
                      setChosenCityId(item.value);
                      setIsCitiesFocus(false);
                    }}
                  />
                : <Dropdown
                    style={[modalStyles.dropdown, isCitiesFocus && { borderColor: 'blue' }]}
                    placeholderStyle={modalStyles.placeholderStyle}
                    selectedTextStyle={modalStyles.selectedTextStyle}
                    inputSearchStyle={modalStyles.inputSearchStyle}
                    iconStyle={modalStyles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="cityName"
                    valueField="id"
                    placeholder={!isCitiesFocus ? 'City' : '...'}
                    searchPlaceholder="Search"
                    value={chosenCityId}
                    onFocus={() => setIsCitiesFocus(true)}
                    onBlur={() => setIsCitiesFocus(false)}
                    onChange={item => {
                      setChosenCityId(item.value);
                      setIsCitiesFocus(false);
                    }}
                  />
            }

            <View style={localStyles.textInputStyle}>
              <TextInput
                placeholder='Address'
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={localStyles.buttonGroup}>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonLeft, budget === 1 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(1)}
              >
                <Text style={localStyles.buttonText}>$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonMiddle, budget === 2 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(2)}
              >
                <Text style={localStyles.buttonText}>$$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonMiddle, budget === 3 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(3)}
              >
                <Text style={localStyles.buttonText}>$$$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonRight, budget === 4 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(4)}
              >
                <Text style={localStyles.buttonText}>$$$$</Text>
              </Pressable>
            </View>

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={handleCloseCreateMatchForm}
            >
              <Text style={modalStyles.textStyle}>Start Matching!</Text>
            </Pressable>
          </View>
        </Modal>
      {/* </SafeAreaView> */}
    </>
  )
}

const localStyles = StyleSheet.create({
  mapView: {
    // w-full h-full rounded-2xl
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  buttonContainer: {
    position: 'absolute',
    width: 300,
    bottom: 64,
    display: 'flex',
    padding: 8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 16,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  buttonGroupButton: {
    height: 40,
    padding: 10,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: ZOMP,
    width: '25%',
    fontWeight: 'bold',
  },
  buttonGroupButtonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonGroupButtonMiddle: {
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  buttonGroupButtonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonGroupButtonChosen: {
    backgroundColor: ASH_GRAY,
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    // margin: 12,
    padding: 10,
    borderRadius: 8,
    borderColor: AAAAAA,
    borderWidth: 1,
    color: AAAAAA,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    bottom: -64,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
