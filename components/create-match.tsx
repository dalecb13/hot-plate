import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CityModel, CountryModel } from "../models/location.model";
import { getCities, getCountries } from "../api/location.api";
import { Dropdown } from "react-native-element-dropdown";

function countryNameAZ( a: CountryModel, b: CountryModel ) {
  if ( a.countryName < b.countryName ){
    return -1;
  }
  if ( a.countryName > b.countryName ){
    return 1;
  }
  return 0;
}

export default function CreateMatch() {
  const [ countries, setCountries ] = useState<CountryModel[]>([]);
  const [isCountriesFocus, setIsCountriesFocus] = useState(false);
  const [ cities, setCities ] = useState<CityModel[]>([]);
  const [isCitiesFocus, setIsCitiesFocus] = useState(false);

  const [ address, setAddress ] = useState<string>('');
  const [ chosenCountryId, setChosenCountryId ] = useState<number>();
  const [ chosenCityId, setChosenCityId] = useState<number>();

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
    <View>
      <Text>Create Match</Text>

      <Dropdown
        style={[styles.dropdown, isCountriesFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
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
        chosenCountryId && <Dropdown
          style={[styles.dropdown, isCitiesFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
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
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
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
});
