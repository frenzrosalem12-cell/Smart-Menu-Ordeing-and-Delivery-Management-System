import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '../components/OrderItem';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { COLORS, peso } from '../constants/theme';

export default function Confirmation() {
  const router = useRouter();
  const { lastOrder: o } = useCart();
  if (!o) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>ORDER CONFIRMED! 🎉</Text>
        <Text style={styles.thanks}>Thank you for ordering from{'\n'}FYI-KANTO FOODS.</Text>

        {/* ORDER SUMMARY BOX */}
        <View style={styles.box}>
          <Text style={styles.label}>Order Number</Text>
          <Text style={styles.big}>#{o.id}</Text>

          <Text style={styles.label}>Payment</Text>
          <Text style={styles.value}>{o.paymentMethod}</Text>
          {o.paymentMethod === 'GCash' && (
            <Text style={styles.status}>Payment Status: {o.paymentStatus}</Text>
          )}

          <Text style={styles.label}>Total</Text>
          <Text style={styles.big}>{peso(o.total)}</Text>
        </View>

        <Text style={styles.section}>Items</Text>
        {o.items.map((i) => <OrderItem key={i.key} item={i} />)}
        <Text style={styles.small}>Subtotal: {peso(o.subtotal)}</Text>
        <Text style={styles.small}>Delivery Fee: {peso(o.deliveryFee)}</Text>

        <Text style={styles.section}>Deliver to</Text>
        <View style={styles.box}>
          <Text style={styles.value}>{o.customer.name}</Text>
          <Text>{o.customer.address}, {o.customer.area}</Text>
          {o.customer.landmark ? <Text>Landmark: {o.customer.landmark}</Text> : null}
          <Text>{o.customer.contact}</Text>
        </View>

        <PrimaryButton title="TRACK MY ORDER" onPress={() => router.replace('/orders')} style={{ marginTop: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  title: { fontSize: 26, fontWeight: '900', color: COLORS.darkGreen, textAlign: 'center', marginTop: 10 },
  thanks: { textAlign: 'center', color: COLORS.green, fontWeight: '700', marginVertical: 10 },
  section: { fontWeight: '800', color: COLORS.darkGreen, fontSize: 16, marginTop: 16, marginBottom: 6 },
  box: { backgroundColor: COLORS.white, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border },
  label: { color: COLORS.gray, fontSize: 12, marginTop: 8 },
  big: { fontSize: 22, fontWeight: '900', color: COLORS.green },
  value: { fontWeight: '800', color: COLORS.text, fontSize: 15 },
  status: { color: COLORS.gold, fontWeight: '800', marginTop: 2 },
  small: { textAlign: 'right', color: COLORS.text },
});