import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { router } from 'expo-router';
import { Button, Input } from '@rneui/themed'
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { AuthContext } from '../lib/context/auth-context';
import { supabase } from '../lib/supabase';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

export default function SignInUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const authContext = useContext(AuthContext);

  async function signInWithEmail() {
    setLoading(true);
    authContext.signIn(email, password);
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      console.warn(error)
    }
    if (!session) {
      console.warn('no session')
      Alert.alert('Please check your inbox for email verification!')
    } else {
      console.log('proceed!')
      router.push('/');
    }
    setLoading(false)
  }

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
  
    if (error) throw error;
    // Email sent.
  };

  return (
    <SafeAreaInsetsContext.Consumer>
      {
        insets => <View style={{ paddingTop: insets!.top }}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button onPress={sendMagicLink} title="Send Magic Link" />
          </View>
        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    backgroundColor: '#25292e',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
