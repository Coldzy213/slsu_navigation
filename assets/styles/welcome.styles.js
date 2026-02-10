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
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  headerGroup: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
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
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.border, // #B3E5FC
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  buttonTextSecondary: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 15,
    color: COLORS.textLight,
  },
});
