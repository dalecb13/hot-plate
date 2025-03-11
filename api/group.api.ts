import { router } from "expo-router";
import { GROUP_TABLE_NAME } from "../constants/table-names"
import { showToast } from "../lib/notifications";
import { supabase } from "../lib/supabase"
import { CreateGroupModel, GroupModel } from "../models/group.model"

export const createGroup = async (details: CreateGroupModel) => {
  const { error } = await supabase
    .from(GROUP_TABLE_NAME)
    .insert({
      groupName: details.groupName,
      groupDetails: details.groupDetails,
    });

  if (error) {
    console.warn(error);
    showToast('error', 'There was an issue creating you Group. Try again later');
  } else {
    console.log('group created!');
    showToast('success', 'Group created!');
    router.push('/groups')
    // await getAllContacts();
  }
}

export const getGroups = async () => {
  const { data, error } = await supabase
    .from(GROUP_TABLE_NAME)
    .select();

  if (error) {
    console.warn(error);
    return [];
  }

  return data as GroupModel[];
}

export const deleteGroup = async (groupId: string) => {
  const response = await supabase
    .from(GROUP_TABLE_NAME)
    .delete()
    .eq('id', groupId);

  if (response.error) {
    showToast('error', 'There was an error deleting the Group! Please try again later');
    console.warn(response.error);
  } else {
    console.log('group delete success response', response);
    showToast('success', 'Group deleted successfully');
  }
}

export const getGroupById = async (groupId: string) => {
  const {data, error} = await supabase
    .from(GROUP_TABLE_NAME)
    .select()
    .eq('id', groupId);

  if (error || !data || data.length == 0 || data.length > 1) {
    console.warn('There was a problem finding that group')
    showToast('error', 'There was a problem finding that group. Please try again later');
  } else {
    return data[0] as GroupModel;
  }
}

export const inviteFriendToGroup = async (groupId: string, userId: string) => {
  const group = await getGroupById(groupId);
  if (!group) {
    console.warn('No group with ID found', groupId);
    return
  }
  const updatedMemberIds = group.memberIds
    ? [userId, ...group.memberIds]
    : [userId]
  const result = await supabase
    .from(GROUP_TABLE_NAME)
    .update({
      memberIds: updatedMemberIds,
    });
  // if (error) {
  //   console.warn('error adding friend to group', error)
  //   showToast('error', 'There was an error adding {} to the group! Please try again later');
  // } else {
  //   console.log(`added ${}`)
  // }
}