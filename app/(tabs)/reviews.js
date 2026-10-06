import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/PrimaryButton';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../constants/theme';

export default function Reviews() {
  const { orderId } = useLocalSearchParams();
  const { orders, reviews, addReview } = useCart();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [target, setTarget] = useState(null);

  // Open the form when coming from the Orders tab
  useEffect(() => { if (orderId) setTarget(orderId); }, [orderId]);

  const toReview = orders.filter((o) => o.status === 'Delivered' && !o.reviewed);

  const submit = () => {
    if (rating === 0) return Alert.alert('Please choose a star rating');
    addReview(target, rating, text);
    setRating(0); setText(''); setTarget(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Reviews</Text>

        {target ? (
          <View style={styles.card}>
            <Text style={styles.h}>Rate your experience ({target})</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable key={n} onPress={() => setRating(n)}>
                  <Text style={{ fontSize: 36, opacity: n <= rating ? 1 : 0.25 }}>⭐</Text>
                </Pressable>
              ))}
            </View>
            <TextInput style={styles.input} multiline placeholder="Write your review..." value={text} onChangeText={setText} />
            <PrimaryButton title="Submit Review" onPress={submit} style={{ marginTop: 12 }} />
          </View>
        ) : (
          toReview.map((o) => (
            <PrimaryButton key={o.id} title={'Rate order ' + o.id} variant="gold" style={{ marginBottom: 10 }} onPress={() => setTarget(o.id)} />
          ))
        )}

        <Text style={styles.h}>Customer Reviews</Text>
        {reviews.length === 0 && <Text style={styles.empty}>No reviews yet.</Text>}
        {reviews.map((r, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{r.name}  {'⭐'.repeat(r.rating)}</Text>
            {r.text ? <Text style={{ color: COLORS.text, marginTop: 4 }}>{r.text}</Text> : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.darkGreen, marginBottom: 10 },
  h: { fontWeight: '800', color: COLORS.darkGreen, fontSize: 16, marginVertical: 8 },
  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  stars: { flexDirection: 'row', justifyContent: 'center', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, minHeight: 90, textAlignVertical: 'top' },
  name: { fontWeight: '800', color: COLORS.green },
  empty: { color: COLORS.gray },
});
