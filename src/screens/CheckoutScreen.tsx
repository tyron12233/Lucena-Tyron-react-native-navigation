import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart, CartItem } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScaleButton from '../components/ScaleButton';

const CheckoutScreen = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { theme, colors } = useTheme();
  const navigation = useNavigation<any>();

  const handleCheckout = () => {
    Alert.alert(
      'Payment Successful',
      'Your minimalist items are on the way.',
      [
        {
          text: 'Great',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.itemRow, { borderBottomColor: colors.border }]}>
      <View>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemQuantity, { color: colors.secondaryText }]}>Quantity: {item.quantity}</Text>
      </View>
      <Text style={[styles.itemPrice, { color: colors.text }]}>₱{(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton, { backgroundColor: colors.card }]}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Summary</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
              <Text style={[styles.totalLabel, { color: colors.secondaryText }]}>Total Amount</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>₱{totalPrice.toFixed(2)}</Text>
            </View>
          }
        />
      </View>

      <View style={styles.footer}>
        <ScaleButton
          style={[styles.confirmButton, { backgroundColor: colors.primary }]}
          onPress={handleCheckout}
        >
          <Text style={[styles.confirmButtonText, { color: theme === 'light' ? '#FFF' : '#000' }]}>Place Order</Text>
        </ScaleButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  summaryContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  itemQuantity: {
    fontSize: 14,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  confirmButton: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

export default CheckoutScreen;
