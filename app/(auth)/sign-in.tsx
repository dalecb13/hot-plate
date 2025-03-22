import { Link, router } from 'expo-router'
import { Text, TextInput, Button, StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'
import globalStyles from 'lib/styles'
import { supabase } from 'lib/supabase'

export default function Page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Error signing in: " + error.message);
    } else {
      router.replace("/(root)/(tabs)/match");
    }
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        <Text style={globalStyles.title}>Welcome Back!</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          value={email}
          placeholder="Enter email"
          onChangeText={(emailAddress) => setEmail(emailAddress)}
        />
        <TextInput
          style={globalStyles.input}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button title="Sign in" onPress={onSignInPress} />
        <View style={localStyles.signUpView}>
          <Text>Don't have an account?</Text>
          <Link
            style={globalStyles.link}
            href="/sign-up"
          >
            <Text>Sign up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  signUpView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
});
