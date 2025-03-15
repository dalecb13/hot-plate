import { NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native";
import { useState } from "react";
import { Button, Input } from "@rneui/themed";

import { CreateGroupModel } from "../../../../models/group.model";
import { createGroup } from "../../../../api/group.api";
import { styles } from "../../../../constants/styles";

export default function CreateGroup() {
  const [ groupName, setGroupName ] = useState('');

  const handleUpdateGroupName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setGroupName(e.nativeEvent.text);
  }

  const handleCreateGroup = async () => {
    const group: CreateGroupModel = {
      groupName,
      groupDetails: {},
    };

    await createGroup(group);
  }

  return (
    <View>
      <Text style={styles.titleText}>Create a Group</Text>

      <Input value={groupName} onChange={handleUpdateGroupName} placeholder="Date Night"></Input>

      <Button onPress={handleCreateGroup}>Create Group</Button>
    </View>
  )
}
