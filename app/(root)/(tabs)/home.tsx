import { Text } from "@rneui/themed";
import { supabase } from "lib/supabase";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TODO: Figure out what to put here, like a feed or recent activity, like Venmo?

const HomePage = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  }

  return (
    <SafeAreaView>
      <Text>Home!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  )
}

export default HomePage;
