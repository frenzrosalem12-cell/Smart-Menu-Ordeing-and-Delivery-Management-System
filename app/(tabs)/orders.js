import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusTimeline from '../../components/StatusTimeline';
import PrimaryButton from '../../components/PrimaryButton';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../constants/theme';

export default function Orders() {
  const router = useRouter();
  const { orders, advanceStatus } = useCart();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>My Orders</Text>
        {orders.length === 0 && <Text style={styles.empty}>No orders yet.</Text>}
        {orders.map((o) => (
          <View key={o.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.id}>{o.id}</Text>
              <Text style={styles.status}>{o.status}</Text>
            </View>
            {o.status !== 'Delivered' && <Text style={styles.eta}>Estimated delivery: {o.eta}</Text>}
            <View style={{ marginVertical: 12 }}><StatusTimeline status={o.status} /></View>
            {o.items.map((i) => (
              <Text key={i.key} style={styles.item}>{i.qty}x {i.product.name} — ₱{i.unitPrice * i.qty}</Text>
            ))}
            <Text style={styles.total}>Total: ₱{o.total}</Text>
            <Text style={styles.addr}>📍 {o.customer.address}</Text>

            {o.status !== 'Delivered' && (
              <PrimaryButton title="Demo: Next Status" variant="gold" style={{ marginTop: 10 }} onPress={() => advanceStatus(o.id)} />
            )}
            {o.status === 'Delivered' && !o.reviewed && (
              <PrimaryButton title="⭐ Rate your experience" style={{ marginTop: 10 }} onPress={() => router.navigate({ pathname: '/reviews', params: { orderId: o.id } })} />
            )}
            {o.reviewed && <Text style={styles.thanks}>Thanks for your review!</Text>}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.darkGreen, marginBottom: 10 },
  empty: { textAlign: 'center', color: COLORS.gray, marginTop: 30 },
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  id: { fontWeight: '900', color: COLORS.darkGreen, fontSize: 16 },
  status: { color: COLORS.green, fontWeight: '800' },
  eta: { color: COLORS.gray, marginTop: 4 },
  item: { color: COLORS.text, marginBottom: 2 },
  total: { fontWeight: '900', color: COLORS.green, fontSize: 17, marginTop: 6 },
  addr: { color: COLORS.gray, marginTop: 4 },
  thanks: { color: COLORS.green, fontWeight: '700', marginTop: 10, textAlign: 'center' },
});
