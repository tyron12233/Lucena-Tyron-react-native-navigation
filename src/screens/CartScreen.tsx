import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart, CartItem } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScaleButton from '../components/ScaleButton';
import FadeInView from '../components/FadeInView';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart, totalPrice } = useCart();
  const { theme, colors } = useTheme();
  const navigation = useNavigation<any>();

  const renderItem = ({ item, index }: { item: CartItem, index: number }) => (
    <FadeInView delay={index * 50} style={[styles.itemCard, { backgroundColor: colors.card, shadowColor: theme === 'light' ? '#000' : 'transparent' }]}>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: colors.secondaryText }]}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={[styles.quantityContainer, { backgroundColor: theme === 'light' ? '#E5E5EA' : '#2C2C2E' }]}>
        <ScaleButton
          style={styles.quantityButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={[styles.quantityText, { color: colors.text }]}>−</Text>
        </ScaleButton>
        <Text style={[styles.quantityValue, { color: colors.text }]}>{item.quantity}</Text>
        <ScaleButton
          style={styles.quantityButton}
          onPress={() => addToCart(item)}
        >
          <Text style={[styles.quantityText, { color: colors.text }]}>+</Text>
        </ScaleButton>
      </View>
    </FadeInView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton, { backgroundColor: colors.card }]}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Cart</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>Your cart is empty.</Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: colors.secondaryText }]}>Total Balance</Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>${totalPrice.toFixed(2)}</Text>
          </View>
          <ScaleButton
            style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={[styles.checkoutButtonText, { color: theme === 'light' ? '#FFF' : '#000' }]}>Checkout</Text>
          </ScaleButton>
        </View>
      )}
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
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 20,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '400',
  },
  quantityValue: {
    width: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  checkoutButton: {
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
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

export default CartScreen;
