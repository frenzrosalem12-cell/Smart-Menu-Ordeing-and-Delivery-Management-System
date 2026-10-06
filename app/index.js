import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      {/* MAIN CONTENT */}
      <View style={styles.center}>

        {/* FYI LOGO */}
        <Image
          source={require('../assets/logo/fyi-logo.jpeg')}
          style={styles.logo}
        />

        {/* BRAND TAGLINE */}
        <Text style={styles.title}>
          FEED YOUR INTESTINE
        </Text>

        {/* SYSTEM NAME */}
        <Text style={styles.tagline}>
          ORDERING & DELIVERY{'\n'}
          MANAGEMENT SYSTEM
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.sub}>
          Fresh drinks • Food favorites • Great value
        </Text>

      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottom}>

        {/* CONTINUE BUTTON */}
        <PrimaryButton
          title="Continue to Menu →"
          onPress={() => router.replace('/menu')}
        />

        {/* LOGIN MESSAGE */}
        <Text style={styles.note}>
          No login needed. Just order!
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
    padding: 24,
  },

  // CENTER CONTENT
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // FYI LOGO
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 28,
  },

  // FEED YOUR INTESTINE
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.darkGreen,
    marginTop: 20,
    textAlign: 'center',
  },

  // ORDERING & DELIVERY
  // MANAGEMENT SYSTEM
  tagline: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.green,
    marginTop: 8,
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 24,
  },

  // DESCRIPTION
  sub: {
    color: COLORS.gray,
    marginTop: 10,
    textAlign: 'center',
  },

  // BOTTOM SECTION
  bottom: {
    paddingBottom: 12,
  },

  // LOGIN MESSAGE
  note: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 10,
  },

});