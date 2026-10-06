import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../context/CartContext';
import { COLORS, AREAS } from '../constants/theme';

// One input field with label, icon and error message
// (kept outside the screen so the keyboard does not close while typing)
function Field({ label, icon, error, ...inputProps }) {
  return (
    <View style={styles.fieldBox}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputError]}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <TextInput style={styles.input} placeholderTextColor={COLORS.gray} {...inputProps} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export default function CustomerInfo() {
  const router = useRouter();
  const { customer, setCustomer } = useCart();

  // Start with saved details (so the form is filled if the customer comes back)
  const [name, setName] = useState(customer.name);
  const [contact, setContact] = useState(customer.contact);
  const [area, setArea] = useState(customer.area);
  const [address, setAddress] = useState(customer.address);
  const [landmark, setLandmark] = useState(customer.landmark);
  const [facebook, setFacebook] = useState(customer.facebook);

  const [areaOpen, setAreaOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Remove the error of a field when the customer edits it
  const clearError = (key) => setErrors({ ...errors, [key]: undefined });

  // Contact number: keep digits only (maxLength 11 is set on the input)
  const changeContact = (text) => {
    setContact(text.replace(/[^0-9]/g, ''));
    clearError('contact');
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please enter your full name.';
    if (!contact) e.contact = 'Please enter your contact number.';
    else if (contact.length !== 11) e.contact = 'Contact number must be 11 digits (example: 09123456789).';
    if (!area) e.area = 'Please select your delivery area.';
    if (!address.trim()) e.address = 'Please enter your complete address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToReview = () => {
    if (!validate()) return;
    setCustomer({
      name: name.trim(),
      contact,
      area,
      address: address.trim(),
      landmark: landmark.trim(),
      facebook: facebook.trim(),
    });
    router.push('/review-order');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* HEADER */}
        <Pressable onPress={() => router.back()}>
          <Text style={styles.title}>← YOUR DETAILS</Text>
        </Pressable>
        <Text style={styles.step}>Step 1 of 2 • Contact information</Text>

        {/* CUSTOMER INFORMATION CARD */}
        <View style={styles.card}>
          <Field
            label="Full Name"
            icon="👤"
            placeholder="Frenz Allen Rosalem"
            value={name}
            onChangeText={(t) => { setName(t); clearError('name'); }}
            error={errors.name}
          />

          <Field
            label="Contact Number"
            icon="📞"
            placeholder="09123456789"
            keyboardType="phone-pad"
            maxLength={11}
            value={contact}
            onChangeText={changeContact}
            error={errors.contact}
          />

          {/* DELIVERY AREA (dropdown style) */}
          <View style={styles.fieldBox}>
            <Text style={styles.label}>Delivery Area</Text>
            <Pressable
              style={[styles.inputRow, errors.area && styles.inputError]}
              onPress={() => setAreaOpen(!areaOpen)}
            >
              <Text style={styles.icon}>📍</Text>
              <Text style={[styles.input, !area && { color: COLORS.gray }]}>
                {area || 'Select delivery area'}
              </Text>
              <Text style={styles.arrow}>{areaOpen ? '▲' : '▼'}</Text>
            </Pressable>

            {areaOpen && (
              <View style={styles.dropdown}>
                {AREAS.map((a) => (
                  <Pressable
                    key={a}
                    style={[styles.option, area === a && styles.optionOn]}
                    onPress={() => { setArea(a); setAreaOpen(false); clearError('area'); }}
                  >
                    <Text style={[styles.optionText, area === a && { color: COLORS.white }]}>{a}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            {errors.area ? <Text style={styles.error}>{errors.area}</Text> : null}
          </View>

          <Field
            label="Complete Address"
            placeholder="Purok 3, Kimaya, Jasaan"
            value={address}
            onChangeText={(t) => { setAddress(t); clearError('address'); }}
            error={errors.address}
          />

          <Field
            label="Landmark (Optional)"
            placeholder="Near barangay hall"
            value={landmark}
            onChangeText={setLandmark}
          />

          <Field
            label="Facebook Account (Optional)"
            placeholder="Frenz Rosalem"
            value={facebook}
            onChangeText={setFacebook}
          />
        </View>

        <Text style={styles.note}>
          🔒 Your details are only used to{'\n'}process and deliver your order.
        </Text>

        <PrimaryButton title="REVIEW ORDER →" variant="gold" onPress={goToReview} />

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
  },

  fieldBox: { marginBottom: 12 },
  label: { fontWeight: '700', color: COLORS.darkGreen, marginBottom: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputError: { borderColor: COLORS.red },
  icon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, color: COLORS.text, fontSize: 15 },
  arrow: { color: COLORS.green, fontSize: 12 },
  error: { color: COLORS.red, fontSize: 12, marginTop: 4 },

  dropdown: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  option: { padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  optionOn: { backgroundColor: COLORS.green },
  optionText: { color: COLORS.darkGreen, fontWeight: '700' },

  note: { textAlign: 'center', color: COLORS.gray, fontSize: 12, marginVertical: 16 },
});