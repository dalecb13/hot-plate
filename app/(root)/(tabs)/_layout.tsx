import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Feather from '@react-native-vector-icons/feather';

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="match/index"
        options={{
          title: "Match",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="list" />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="list" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="settings" />
          ),
        }}
      /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'calc(infinity * 1px)',
  },
  imageContainer: {
    // rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}
    borderRadius: 'calc(infinity * 1px)',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 28,
    height: 38,
  },
});

export default Layout;
