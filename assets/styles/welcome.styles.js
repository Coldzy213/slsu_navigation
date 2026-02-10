import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const { height, width } = Dimensions.get("window");

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    marginTop: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPreview: {
    width: width * 0.6,
    height: width * 0.6,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    //paddingHorizontal: 30,
    paddingVertical: height * 0.05,
    justifyContent: "space-between",
  },
  headerGroup: {},
  title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 32,
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textLight,
    textAlign: "center",
  },
  buttonGroup: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonTextPrimary: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  buttonTextSecondary: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
    fontSize: 18,
    textAlign: "center",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: COLORS.textLight,
  },
  linkTextClick: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#FF7E67",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});
