import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { deleteGroup, getGroups } from "../../../api/group.api";
import { GroupModel } from "../../../models/group.model";
import GroupList from "../../../components/groups/group-list";
import { styles } from "../../../constants/styles";

export default function GroupsHome() {
  const [groups, setGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    retrieveGroups();
  }, []);

  const retrieveGroups = async () => {
    const retrievedGroups = await getGroups();
    setGroups(retrievedGroups);
  }

  const handleDeleteGroup = async (groupId: string) => {
    await deleteGroup(groupId);
    console.log('refetching groups')
    await retrieveGroups();
  }

  return (
    <View>
      <Text style={styles.titleText}>Groups Home!</Text>
      <GroupList
        groups={groups}
        handleDeleteGroup={handleDeleteGroup}
      />
    </View>
  )
}
