import { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '../components/OrderItem';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { COLORS, DELIVERY_FEES, GCASH, peso } from '../constants/theme';

// One selectable payment card (radio style)
function PaymentOption({ icon, title, subtitle, selected, onPress }) {
  return (
    <Pressable style={[styles.payCard, selected && styles.payCardOn]} onPress={onPress}>
      <Text style={styles.payIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.payTitle}>{title}</Text>
        <Text style={styles.paySub}>{subtitle}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
}

export default function ReviewOrder() {
  const router = useRouter();
  const { cart, total, customer, placeOrder } = useCart();

  const [method, setMethod] = useState('Cash on Delivery');
  const [reference, setReference] = useState('');
  const [paid, setPaid] = useState(false);
  const [errors, setErrors] = useState({});

  // Totals are calculated from the cart (nothing is hardcoded)
  const deliveryFee = DELIVERY_FEES[customer.area] || 0;
  const grandTotal = total + deliveryFee;
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handlePlaceOrder = () => {
    const e = {};

    if (cart.length === 0) {
      e.general = 'Your order is empty.';
    } else if (!customer.name || !customer.contact || !customer.area || !customer.address) {
      e.general = 'Please complete your details first.';
    }

    if (method === 'GCash') {
      if (!reference.trim()) e.reference = 'Please enter your GCash payment reference number.';
      if (!paid) e.paid = 'Please confirm that you have completed the payment.';
    }

    setErrors(e);
    if (Object.keys(e).length > 0) return;

    placeOrder({
      deliveryFee: deliveryFee,
      paymentMethod: method,
      paymentReference: reference.trim(),
    });
    router.replace('/confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* HEADER */}
        <Pressable onPress={() => router.back()}>
          <Text style={styles.title}>← REVIEW ORDER</Text>
        </Pressable>
        <Text style={styles.step}>Step 2 of 2 • Confirm before placing</Text>

        {/* CUSTOMER INFORMATION CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Information</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{customer.name}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{customer.address}</Text>
          <Text style={styles.valueSmall}>{customer.area}</Text>
          {customer.landmark ? <Text style={styles.valueSmall}>Landmark: {customer.landmark}</Text> : null}

          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{customer.contact}</Text>

          {customer.facebook ? (
            <>
              <Text style={styles.label}>Facebook</Text>
              <Text style={styles.value}>{customer.facebook}</Text>
            </>
          ) : null}
        </View>

        {/* ORDER ITEMS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Order Items • {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>

          {cart.map((item) => (
            <OrderItem key={item.key} item={item} />
          ))}

          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowValue}>{peso(total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Fee ({customer.area})</Text>
            <Text style={styles.rowValue}>{peso(deliveryFee)}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{peso(grandTotal)}</Text>
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <Text style={styles.section}>PAYMENT METHOD</Text>

        <PaymentOption
          icon="🟢"
          title="Cash on Delivery"
          subtitle="Pay when your order arrives"
          selected={method === 'Cash on Delivery'}
          onPress={() => setMethod('Cash on Delivery')}
        />
        <PaymentOption
          icon="🔵"
          title="GCash"
          subtitle="Pay before delivery"
          selected={method === 'GCash'}
          onPress={() => setMethod('GCash')}
        />

        {/* COD MESSAGE */}
        {method === 'Cash on Delivery' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cash on Delivery</Text>
            <Text style={styles.value}>Pay when your order arrives.</Text>
          </View>
        )}

        {/* GCASH SECTION */}
        {method === 'GCash' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>GCASH PAYMENT</Text>
            <Text style={styles.value}>Scan the QR code below to pay your order.</Text>

            <Image source={require('../assets/payment/gcash-qr.png')} style={styles.qr} />

            <Text style={styles.label}>GCash Number</Text>
            <Text style={styles.value}>{GCASH.number}</Text>

            <Text style={styles.label}>Account Name</Text>
            <Text style={styles.value}>{GCASH.accountName}</Text>

            <Text style={styles.label}>Amount to Pay</Text>
            <Text style={styles.totalValue}>{peso(grandTotal)}</Text>

            <Text style={styles.label}>Payment Reference Number</Text>
            <TextInput
              style={[styles.input, errors.reference && styles.inputError]}
              placeholder="Enter reference number"
              placeholderTextColor={COLORS.gray}
              value={reference}
              onChangeText={(t) => { setReference(t); setErrors({ ...errors, reference: undefined }); }}
            />
            {errors.reference ? <Text style={styles.error}>{errors.reference}</Text> : null}

            <Pressable
              style={styles.checkRow}
              onPress={() => { setPaid(!paid); setErrors({ ...errors, paid: undefined }); }}
            >
              <View style={[styles.box, paid && styles.boxOn]}>
                {paid && <Text style={styles.tick}>✓</Text>}
              </View>
              <Text style={styles.checkText}>I have completed the payment</Text>
            </Pressable>
            {errors.paid ? <Text style={styles.error}>{errors.paid}</Text> : null}
          </View>
        )}

        {errors.general ? <Text style={[styles.error, { marginTop: 10 }]}>{errors.general}</Text> : null}

        <PrimaryButton title="PLACE ORDER" variant="gold" onPress={handlePlaceOrder} style={{ marginTop: 16 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scroll: { padding: 16, paddingBottom: 40 },

  title: { fontSize: 22, fontWeight: '900', color: COLORS.darkGreen },
  step: { color: COLORS.gray, marginTop: 4, marginBottom: 14 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  cardTitle: { fontWeight: '900', color: COLORS.darkGreen, fontSize: 16, marginBottom: 6 },
  label: { color: COLORS.gray, fontSize: 12, marginTop: 8 },
  value: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  valueSmall: { color: COLORS.gray, fontSize: 13 },

  line: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  rowLabel: { color: COLORS.text },
  rowValue: { color: COLORS.text, fontWeight: '700' },
  totalLabel: { fontWeight: '900', color: COLORS.darkGreen, fontSize: 16 },
  totalValue: { fontWeight: '900', color: COLORS.green, fontSize: 18 },

  section: { fontWeight: '900', color: COLORS.darkGreen, fontSize: 16, marginBottom: 8 },

  payCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  payCardOn: { borderColor: COLORS.green, backgroundColor: COLORS.lightGreen },
  payIcon: { fontSize: 22, marginRight: 12 },
  payTitle: { fontWeight: '800', color: COLORS.darkGreen, fontSize: 15 },
  paySub: { color: COLORS.gray, fontSize: 12 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.green,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOn: { backgroundColor: COLORS.white },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.green },

  qr: { width: 200, height: 200, alignSelf: 'center', marginVertical: 12 },
  input: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.red },
  error: { color: COLORS.red, fontSize: 12, marginTop: 4 },

  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  box: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.green,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  boxOn: { backgroundColor: COLORS.green },
  tick: { color: COLORS.white, fontWeight: '900' },
  checkText: { color: COLORS.text, fontWeight: '700' },
});