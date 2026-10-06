import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

const TABS = [
  { name: 'menu', label: 'Menu', icon: '🍽️' },
  { name: 'orders', label: 'Orders', icon: '🛵' },
  { name: 'reviews', label: 'Reviews', icon: '⭐' },
];

// Used as the custom tabBar of Expo Router <Tabs>
export default function BottomNavigation({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const activeName = state.routes[state.index].name;
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map((t) => {
        const active = activeName === t.name;
        return (
          <Pressable key={t.name} style={styles.tab} onPress={() => navigation.navigate(t.name)}>
            <Text style={{ fontSize: 22, opacity: active ? 1 : 0.6 }}>{t.icon}</Text>
            <Text style={[styles.label, active && styles.active]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: COLORS.green, paddingTop: 8 },
  tab: { flex: 1, alignItems: 'center' },
  label: { color: '#CFE3D3', fontSize: 12, marginTop: 2 },
  active: { color: COLORS.gold, fontWeight: '800' },
});
