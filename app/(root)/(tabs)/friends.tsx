import { Text, View } from "react-native";
import { styles } from "../../../constants/styles";
import { useEffect, useState } from "react";
import { FriendModel } from "../../../models/friend.model";
import { getFriendsList } from "../../../api/user.api";
import FriendsList from "../../../components/friends/friends-list";

export default function FriendsHome() {
  const [friends, setFriends] = useState<FriendModel[]>([]);

  useEffect(() => {
    const retrieveFriends = async () => {
      const retrievedFriends = await getFriendsList();
      setFriends(retrievedFriends);
    }

    retrieveFriends();
  }, []);

  return (
    <View>
      <Text style={styles.titleText}>Friends Home</Text>

      <FriendsList friends={friends} />
    </View>
  )
}
