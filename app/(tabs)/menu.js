import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '../../components/ProductCard';
import CategoryButton from '../../components/CategoryButton';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../constants/theme';

export default function Menu() {
  const router = useRouter();

  const { addToCart, count, total } = useCart();

  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Filter products by category and search
  const filtered = PRODUCTS.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Quick add: first size, no add-ons
  const quickAdd = (p) => {
    addToCart(
      p,
      p.sizes ? p.sizes[0] : null,
      [],
      1
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* FYI LOGO */}
        <Image
          source={require('../../assets/logo/fyi-logo.jpeg')}
          style={styles.logo}
        />

        {/* BRAND NAME */}
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>
            FYI-KANTO FOODS
          </Text>
          

          <Text style={styles.tag}>
            Beside USTP – Jasaan Campus · Delivery 30–45 min
          </Text>
        </View>

      </View>

      {/* SEARCH BAR */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Search dishes..."
        placeholderTextColor={COLORS.gray}
        value={search}
        onChangeText={setSearch}
      />

      {/* CATEGORY BUTTONS */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((c) => (
            <CategoryButton
              key={c}
              label={c}
              active={category === c}
              onPress={() => setCategory(c)}
            />
          ))}
        </ScrollView>
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No items found.
          </Text>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              router.push('/product/' + item.id)
            }
            onAdd={() => quickAdd(item)}
          />
        )}
      />

      {/* VIEW ORDER BAR */}
      {count > 0 && (
        <Pressable
          style={styles.cartBar}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.cartText}>
            View Order ({count})
          </Text>

          <Text style={styles.cartText}>
            ₱{total}
          </Text>
        </Pressable>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // MAIN SCREEN
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  // FYI LOGO IMAGE
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 12,
  },

  // BRAND TEXT CONTAINER
  brandContainer: {
    flex: 1,
    marginLeft: 10,
  },

  // BRAND NAME
  brand: {
    fontWeight: '900',
    fontSize: 16,
    color: COLORS.darkGreen,
  },

  // TAGLINE
  tag: {
    fontSize: 12,
    color: COLORS.green,
  },

  // SEARCH BAR
  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },

  // CATEGORY AREA
  categoryContainer: {
    height: 46,
  },

  // CATEGORY SCROLL
  categoryScroll: {
    paddingHorizontal: 16,
  },

  // PRODUCT LIST
  productList: {
    padding: 16,
    paddingBottom: 100,
  },

  // EMPTY RESULT
  empty: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 30,
    fontSize: 15,
  },

  // VIEW ORDER BAR
  cartBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // VIEW ORDER TEXT
  cartText: {
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontSize: 16,
  },

});