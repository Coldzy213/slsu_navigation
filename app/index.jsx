import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

import { welcomeStyles } from "../assets/styles/welcome.styles";

export default function Index() {
  const router = useRouter();
  return (
    <View style={welcomeStyles.container}>
      <ScrollView
        contentContainerStyle={welcomeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION: Highlighting the SLSU Campus */}
        <View style={welcomeStyles.heroContainer}>
          <Image
            source={require("../assets/images/slsu_logo.png")}
            style={welcomeStyles.mapPreview}
          />
        </View>

        {/* TEXT CONTENT */}
        <View style={welcomeStyles.contentContainer}>
          <View style={welcomeStyles.headerGroup}>
            <Text style={welcomeStyles.title}>SLSU Navigator</Text>
            <Text style={welcomeStyles.subtitle}>
              Your official 2D campus companion. Find classrooms, offices, and
              landmarks with ease.
            </Text>
          </View>

          {/* ACTION BUTTONS */}
          <View style={welcomeStyles.buttonGroup}>
            <TouchableOpacity
              style={welcomeStyles.primaryButton}
              onPress={() => router.push("/(tabs)/map")} // Navigate to your OSM Map
              activeOpacity={0.8}
            >
              <Text style={welcomeStyles.buttonTextPrimary}>
                Start Exploring
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={welcomeStyles.secondaryButton}
              onPress={() => router.push("/(auth)/sign-in")}
              activeOpacity={0.7}
            >
              <Text style={welcomeStyles.buttonTextSecondary}>
                Sign In to Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER LINK */}
          <TouchableOpacity
            style={welcomeStyles.linkContainer}
            onPress={() => router.push("/(auth)/sign-up")}
          >
            <Text style={welcomeStyles.linkText}>
              New student?{" "}
              <Text style={welcomeStyles.linkTextClick}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
