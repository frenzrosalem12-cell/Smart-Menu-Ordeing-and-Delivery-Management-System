import { View, Image, Text } from 'react-native';
import { COLORS } from '../constants/theme';

// Shows the real image if product.image is set, otherwise a big emoji
export default function FoodImage({ product, style, size = 40 }) {
  if (product.image) return <Image source={product.image} style={style} resizeMode="cover" />;
  return (
    <View style={[{ backgroundColor: COLORS.lightGreen, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Text style={{ fontSize: size }}>{product.emoji}</Text>
    </View>
  );
}
