import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function QuantitySelector({ qty, onMinus, onPlus }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onMinus} style={styles.btn}><Text style={styles.sym}>−</Text></Pressable>
      <Text style={styles.qty}>{qty}</Text>
      <Pressable onPress={onPlus} style={styles.btn}><Text style={styles.sym}>+</Text></Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
  sym: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  qty: { marginHorizontal: 14, fontSize: 16, fontWeight: '800', color: COLORS.text },
});
