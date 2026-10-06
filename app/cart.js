import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '../components/OrderItem';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { COLORS } from '../constants/theme';

export default function Cart() {
  const router = useRouter();
  const { cart, total, changeQty, removeItem } = useCart();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.back} onPress={() => router.back()}>← Back</Text>
      <Text style={styles.title}>Your Order</Text>
      <FlatList
        data={cart}
        keyExtractor={(i) => i.key}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>Your order is empty. Add something yummy! 🍔</Text>}
        renderItem={({ item }) => (
          <OrderItem item={item} onChange={(d) => changeQty(item.key, d)} onRemove={() => removeItem(item.key)} />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₱{total}</Text>
        </View>
        <PrimaryButton
          title="Place Order →"
          variant="gold"
          onPress={() => (cart.length ? router.push('/customer-info') : router.back())}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  back: { color: COLORS.green, fontWeight: '700', padding: 16, paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.darkGreen, paddingHorizontal: 16, marginTop: 8 },
  empty: { textAlign: 'center', color: COLORS.gray, marginTop: 40 },
  footer: { padding: 16, borderTopWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  totalValue: { fontSize: 22, fontWeight: '900', color: COLORS.green },
});
