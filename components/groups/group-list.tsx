import { Text, View } from "react-native"
import { GroupModel } from "../../models/group.model"
import GroupSimple from "./group-simple"
import { Link } from "expo-router"

export type GroupListProps = {
  groups: GroupModel[]
  handleDeleteGroup: (groupId: string) => void
}

export default function GroupList(props: GroupListProps) {
  return (
    <View>
      {
        !props.groups || !props.groups.length
          ? <View>
              <Text>No groups found</Text>
              <Link href="/groups/create">Create one?</Link>
            </View>
          : <View>
              {
                props.groups.map(group => {
                  return (
                    <GroupSimple
                      key={group.id}
                      id={group.id}
                      groupName={group.groupName}
                      handleDeleteGroup={props.handleDeleteGroup}
                    />
                  )
                })
              }
            </View>
      }
    </View>
  )
}