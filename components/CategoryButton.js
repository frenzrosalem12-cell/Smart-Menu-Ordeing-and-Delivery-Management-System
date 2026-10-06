import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function CategoryButton({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.btn, active && styles.active]}>
      <Text style={[styles.text, active && { color: COLORS.white }]}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.green, marginRight: 8, backgroundColor: COLORS.white },
  active: { backgroundColor: COLORS.green },
  text: { color: COLORS.green, fontWeight: '700', fontSize: 13 },
});
