import { Text, View } from "react-native";
import { styles } from "../../constants/styles";
import { useState } from "react";
import { Input } from "@rneui/themed";

export default function CreateGroup() {
  const [ groupName, setGroupName ] = useState('');

  return (
    <View>
      <Text style={styles.titleText}>Create a Group</Text>

      <Input value={groupName} onChange={() => setGroupName}></Input>
    </View>
  )
}
