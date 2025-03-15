import { Button, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { Data, getAutoComplete } from "../../../../api/restaurants/tripadvisor-com";

export default function TestHome() {
  const [location, setLocation] = useState('');
  const [geoIds, setGeoIds] = useState([]);

  const autoComplete = async () => {
    const acResult = await getAutoComplete(location);
    const results = acResult.data
      .filter((datum: Data) => datum.trackingItems.placeType === 'CITY')
      .map((datum: Data) => {
        return {
          geoId: datum.geoId,
          location: datum.secondaryTextLineOne,
          
        }
      });
  }

  return (
    <View>
      <Text>API Test Page</Text>

      <Input
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Button
        title="Get Geo ID"
        onPress={() => autoComplete()}
      />

      <JsonView data={geoIds} shouldExpandNode={allExpanded} style={defaultStyles} />
    </View>
  )
}
