import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodImage from '../../components/FoodImage';
import QuantitySelector from '../../components/QuantitySelector';
import PrimaryButton from '../../components/PrimaryButton';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../constants/theme';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);

  const [size, setSize] = useState(product?.sizes ? product.sizes[Math.min(1, product.sizes.length - 1)] : null);
  const [selected, setSelected] = useState([]);
  const [qty, setQty] = useState(1);

  if (!product) return <Text>Product not found</Text>;

  const toggleAddOn = (a) =>
    setSelected((prev) => (prev.find((x) => x.name === a.name) ? prev.filter((x) => x.name !== a.name) : [...prev, a]));

  const unit = (size ? size.price : product.price) + selected.reduce((s, a) => s + a.price, 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View>
          <FoodImage product={product} style={styles.img} size={100} />
          <Pressable style={styles.back} onPress={() => router.back()}><Text style={{ fontSize: 18 }}>←</Text></Pressable>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.desc}>{product.description}</Text>
          <Text style={styles.price}>₱{unit}</Text>

          {product.sizes && (
            <>
              <Text style={styles.section}>Size</Text>
              {product.sizes.map((s) => (
                <Pressable key={s.name} style={[styles.option, size?.name === s.name && styles.optionOn]} onPress={() => setSize(s)}>
                  <Text style={[styles.optText, size?.name === s.name && styles.optTextOn]}>{s.name}</Text>
                  <Text style={[styles.optText, size?.name === s.name && styles.optTextOn]}>₱{s.price}</Text>
                </Pressable>
              ))}
            </>
          )}

          {product.addOns && (
            <>
              <Text style={styles.section}>Add-ons</Text>
              {product.addOns.map((a) => {
                const on = selected.find((x) => x.name === a.name);
                return (
                  <Pressable key={a.name} style={[styles.option, on && styles.optionOn]} onPress={() => toggleAddOn(a)}>
                    <Text style={[styles.optText, on && styles.optTextOn]}>{on ? '☑' : '☐'}  {a.name}</Text>
                    <Text style={[styles.optText, on && styles.optTextOn]}>+₱{a.price}</Text>
                  </Pressable>
                );
              })}
            </>
          )}

          <View style={styles.qtyRow}>
            <Text style={styles.section}>Quantity</Text>
            <QuantitySelector qty={qty} onMinus={() => setQty(Math.max(1, qty - 1))} onPlus={() => setQty(qty + 1)} />
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 16 }}>
        <PrimaryButton
          title={'Add to Order • ₱' + unit * qty}
          onPress={() => { addToCart(product, size, selected, qty); router.push('/cart'); }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  img: { width: '100%', height: 260 },
  back: { position: 'absolute', top: 50, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 16 },
  name: { fontSize: 24, fontWeight: '900', color: COLORS.darkGreen },
  desc: { color: COLORS.gray, marginTop: 4 },
  price: { fontSize: 22, fontWeight: '900', color: COLORS.green, marginTop: 8 },
  section: { fontWeight: '800', color: COLORS.darkGreen, fontSize: 16, marginTop: 16, marginBottom: 6 },
  option: { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: COLORS.green, borderRadius: 12, padding: 12, marginBottom: 8, backgroundColor: COLORS.white },
  optionOn: { backgroundColor: COLORS.green },
  optText: { color: COLORS.green, fontWeight: '700' },
  optTextOn: { color: COLORS.white },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
