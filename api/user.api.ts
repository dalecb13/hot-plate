import { FRIENDS_TABLE_NAME } from "../constants/table-names"
import { supabase } from "../lib/supabase"
import { FriendModel } from "../models/friend.model"

export const addFriend = async (friendId: string) => {
  // make sure user exists
  const {data: friend, error: findFriendError} = await supabase
    .from('users')
    .select()
    .eq('id', friendId);

  if (findFriendError) {
    console.warn('error finding friend', findFriendError)
  } else {
    console.log('found friend!', friend)
  }

  // get existing list of friends
  const {data: friendsList, error: findFriendsListError} = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select();

  if (findFriendError) {
    console.warn('error finding list of friends', findFriendsListError)
  } else {
    console.log('found friends list', friendsList)
  }

  const updatedList = !friendsList || !friendsList.length
    ? [friendId]
    : [friendId, ...friendsList]

  // update friendslist
  const {data, error} = await supabase
    .from(FRIENDS_TABLE_NAME)
    .upsert({
      destinationFriendIds: updatedList,
    });

  if (error) {
    console.warn('error updating friends list', error)
  } else {
    console.log('updated friends list', data)
  }
};

export const getFriendsList = async (): Promise<FriendModel[]> => {
  const {data, error} = await supabase
    .from(FRIENDS_TABLE_NAME)
    .select()

  console.log('retrieved friends', data)
  return data as FriendModel[];
}
