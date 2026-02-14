import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme";

export const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%', // Fixed width for 2-column grid
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  boxCircleContainer: {
    backgroundColor: '#f1f5f9',
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[800],
    textAlign: 'center',
    paddingHorizontal: 8,
  }
});