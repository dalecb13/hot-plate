import { Text, View } from "react-native";
import { styles } from "../../constants/styles";
import { Button } from "@rneui/themed";
import { deleteGroup } from "../../api/group.api";

export type GroupSimpleProps = {
  id: string
  groupName: string
  numMembers?: number
  handleDeleteGroup: (groupId: string) => void
}

export default function GroupSimple(props: GroupSimpleProps) {
  const handleDeleteGroup = async () => {
    await deleteGroup(props.id);
  }
  return (
    <View>
      <View>
        <Text style={styles.titleText}>Name: {props.groupName}</Text>
        <Text style={styles.text}># Members: {!props.numMembers ? 0 : props.numMembers}</Text>
      </View>
      <View>
        <Button onPress={handleDeleteGroup}>Delete</Button>
      </View>
    </View>
  )
}
