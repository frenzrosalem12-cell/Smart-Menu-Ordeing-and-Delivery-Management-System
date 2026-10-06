import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import FoodImage from './FoodImage';

export default function ProductCard({ product, onPress, onAdd }) {
  const from = product.sizes ? product.sizes[0].price : product.price;
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <FoodImage product={product} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{product.sizes ? 'from ' : ''}₱{from}</Text>
          <Pressable onPress={onAdd} style={styles.add}>
            <Text style={styles.addText}>+ Add</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.green, borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  img: { width: 100, height: 110 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  name: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
  desc: { color: '#CFE3D3', fontSize: 12, marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { color: COLORS.gold, fontWeight: '800', fontSize: 16 },
  add: { backgroundColor: COLORS.gold, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  addText: { color: COLORS.darkGreen, fontWeight: '800' },
});
