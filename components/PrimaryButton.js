import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function PrimaryButton({ title, onPress, variant = 'green', style }) {
  const gold = variant === 'gold';
  return (
    <Pressable onPress={onPress} style={[styles.btn, { backgroundColor: gold ? COLORS.gold : COLORS.green }, style]}>
      <Text style={[styles.text, { color: gold ? COLORS.darkGreen : COLORS.white }]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  text: { fontSize: 16, fontWeight: '800' },
});
