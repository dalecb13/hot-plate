import { Text, View } from "react-native"
import { FriendModel } from "../../models/friend.model"

export type FriendsListProps = {
  friends: FriendModel[]
}

export default function FriendsList(props: FriendsListProps) {
  return (
    <View>
      {
        !props.friends || !props.friends.length
          ? <Text>No friends found! Add one?</Text>
          : <View>
              {
                props.friends.map(friend => {
                  return <View>
                    <Text>{friend.firstName} {friend.lastName}</Text>
                  </View>
                })
              }
            </View>
      }
    </View>
  )
}
