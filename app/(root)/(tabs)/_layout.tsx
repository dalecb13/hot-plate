import { Stack, Tabs, useRouter } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useEffect, useState } from "react";
import { supabase } from "lib/supabase";

const Layout = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // On mount, check current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
      if (!data.session) {
        router.replace("/(auth)/sign-in");
      }
    });

    // Also subscribe to any auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/(auth)/sign-in");
      } else {
        setSession(session);
      }
    });

    return () => {
      sub?.subscription.unsubscribe();
    };
  }, [router]);

  if (!checked) {
    // We haven't finished checking session => show nothing or a loader
    return null;
  }

  if (!session) {
    // We already redirected, but if not, show nothing
    return null;
  }

  return (
    <Stack />
    // <Tabs
    //   initialRouteName="home"
    //   screenOptions={{
    //     tabBarActiveTintColor: "red",
    //     tabBarInactiveTintColor: "white",
    //     tabBarShowLabel: true,
    //     tabBarStyle: {
    //       backgroundColor: "#333333",
    //       borderRadius: 50,
    //       paddingBottom: 0, // ios only
    //       overflow: "hidden",
    //       marginHorizontal: 20,
    //       marginBottom: 20,
    //       height: 78,
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       flexDirection: "row",
    //       position: "absolute",
    //     },
    //   }}
    // >
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       title: "Home",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <FontAwesome6 name="house" iconStyle="solid" />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="match/index"
    //     options={{
    //       title: "Match",
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <FontAwesome6 name="utensils" iconStyle="solid" />
    //       ),
    //     }}
    //   />
    // </Tabs>
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
