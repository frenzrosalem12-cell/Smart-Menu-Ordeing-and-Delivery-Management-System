import { View, Text, StyleSheet } from 'react-native';
import { COLORS, STATUSES } from '../constants/theme';

export default function StatusTimeline({ status }) {
  const current = STATUSES.indexOf(status);
  return (
    <View>
      {STATUSES.map((s, i) => {
        const done = i <= current;
        return (
          <View key={s} style={styles.row}>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.dot, done && styles.dotDone]}>
                <Text style={{ color: COLORS.white, fontSize: 12 }}>{done ? '✓' : ''}</Text>
              </View>
              {i < STATUSES.length - 1 && <View style={[styles.line, i < current && styles.lineDone]} />}
            </View>
            <Text style={[styles.label, done && styles.labelDone, i === current && { color: COLORS.green }]}>{s}</Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', minHeight: 44 },
  dot: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: COLORS.green },
  line: { width: 3, flex: 1, backgroundColor: COLORS.border },
  lineDone: { backgroundColor: COLORS.green },
  label: { marginLeft: 12, color: COLORS.gray, fontSize: 15, paddingTop: 2 },
  labelDone: { color: COLORS.text, fontWeight: '700' },
});
