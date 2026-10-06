import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import FoodImage from './FoodImage';
import QuantitySelector from './QuantitySelector';

// Editable row (cart). Pass no onChange to show a read-only row.
export default function OrderItem({ item, onChange, onRemove }) {
  const extra = [item.size?.name, ...item.addOns.map((a) => a.name)].filter(Boolean).join(', ');
  return (
    <View style={styles.card}>
      <FoodImage product={item.product} style={styles.img} size={28} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{item.product.name}</Text>
        {extra ? <Text style={styles.extra}>{extra}</Text> : null}
        <Text style={styles.price}>₱{item.unitPrice * item.qty}</Text>
        {onChange ? (
          <View style={styles.row}>
            <QuantitySelector qty={item.qty} onMinus={() => onChange(-1)} onPlus={() => onChange(1)} />
            <Pressable onPress={onRemove}><Text style={styles.remove}>Remove</Text></Pressable>
          </View>
        ) : (
          <Text style={styles.extra}>Qty: {item.qty}</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 14, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  img: { width: 70, height: 70, borderRadius: 12, overflow: 'hidden' },
  name: { fontWeight: '800', color: COLORS.darkGreen, fontSize: 15 },
  extra: { color: COLORS.gray, fontSize: 12 },
  price: { color: COLORS.green, fontWeight: '800', marginVertical: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  remove: { color: COLORS.red, fontWeight: '700', fontSize: 12 },
});
