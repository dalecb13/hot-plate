import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import globalStyles from 'lib/styles';
import { getMatchGames } from 'api/match.api';
import { MatchModel } from 'models/match.model';
import { Link } from 'expo-router';

export default function MatchHome() {
  const router = useRouter();

  const [ inactiveMatches, setInactiveMatches ] = useState<MatchModel[]>([]);
  const [ activeMatches, setActiveMatches ] = useState<MatchModel[]>([]);

  useEffect(() => {
    const fetchMatchGames = async () => {
      const fetchedGames: MatchModel[] = await getMatchGames();

      const activeGames = fetchedGames.filter(game => game.isActive);
      setActiveMatches(activeGames);

      const inactiveGames = fetchedGames.filter(game => !game.isActive);
      setInactiveMatches(inactiveGames);
    }
    fetchMatchGames();
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      {
        !activeMatches || !activeMatches.length
          ? <View style={!inactiveMatches || !inactiveMatches.length ? localStyles.mainView : localStyles.halfView}>
              <Text>No active match games.</Text>
              <FontAwesome6 name="drumstick-bite" iconStyle='solid' size={64} />
              <Link
                style={globalStyles.primaryButton}
                href="/match/create"
              >
                Create one?
              </Link>
            </View>
          : <View>
              <Text>Active games</Text>
              <View>
                {
                  activeMatches.map(activeMatch => {
                    return <View>
                      <Text>Address: {activeMatch.address}</Text>
                    </View>
                  })
                }
              </View>
            </View>
      }
      {
        !inactiveMatches || !inactiveMatches.length
          ? <Text>No past games</Text>
          : <View>
              <Text>Past Games</Text>

              <View>
                {
                  !inactiveMatches || !inactiveMatches.length
                    ? <Text>No inactive matches</Text>
                    : <View>
                        <Text>Inactive Matches</Text>
                      </View>
                }
              </View>
            </View>
      }
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  halfView: {
    display: 'flex',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
});
