import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { onboarding } from "../../constants/onboarding";
import CustomButton from "../../components/common/custom-button";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={styles.touchableOpacity}
      >
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View style={styles.swiperDot} />
        }
        activeDot={
          <View style={styles.activeSwiperDot} />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.onboarding}>
            {/* <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            /> */}
            <View style={styles.onboardingContent}>
              <Text style={styles.onboardingTitle}>
                {item.title}
              </Text>
            </View>
            <Text style={styles.onboardingDescription}>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  touchableOpacity: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  text: {
    // text-black text-md font-JakartaBold
    color: 'black',
  },
  swiperDot: {
    // w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full
    width: 32,
    height: 4,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 'calc(infinity * 1px)',
  },
  activeSwiperDot: {
    // w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full
    width: 32,
    height: 4,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#0286FF',
    borderRadius: 'calc(infinity * 1px)',
  },
  onboarding: {
    // flex items-center justify-center p-5
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  onboardingContent: {
    // flex flex-row items-center justify-center w-full mt-10
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  onboardingTitle: {
    // text-black text-3xl font-bold mx-10 text-center
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    marginRight: 40,
    marginLeft: 40,
    textAlign: 'center',
  },
  onboardingDescription: {
    // text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3
    textAlign: 'center',
    color: '#858585',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 12,
  },
});
