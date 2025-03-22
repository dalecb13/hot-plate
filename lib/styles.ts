import { ASH_GRAY, DEEP_SKY_BLUE } from "constants/colors";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  safeAreaStyle: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  link: {
    color: DEEP_SKY_BLUE,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: '100%',
    padding: 8,
    borderColor: ASH_GRAY,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default globalStyles;
