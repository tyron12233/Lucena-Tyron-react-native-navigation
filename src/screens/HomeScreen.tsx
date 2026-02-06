import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart, Product } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScaleButton from '../components/ScaleButton';
import FadeInView from '../components/FadeInView';

const HomeScreen = () => {
  const { addToCart, totalItems } = useCart();
  const { theme, toggleTheme, colors } = useTheme();
  const navigation = useNavigation<any>();

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <FadeInView delay={index * 100} style={[styles.productCard, { backgroundColor: colors.card, shadowColor: theme === 'light' ? '#000' : 'transparent' }]}>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.productPrice, { color: colors.secondaryText }]}>₱{item.price.toFixed(2)}</Text>
      </View>
      <ScaleButton
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => addToCart(item)}
      >
        <Text style={[styles.addButtonText, { color: theme === 'light' ? '#FFF' : '#000' }]}>Add</Text>
      </ScaleButton>
    </FadeInView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.secondaryText }]}>Welcome,</Text>
          <Text style={[styles.title, { color: colors.text }]}>Store</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: colors.card }]}>
            <Text style={{ fontSize: 18 }}>{theme === 'light' ? '🌙' : '☀️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ScaleButton
        style={[styles.cartButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Cart')}
      >
        <View style={styles.cartButtonContent}>
          <Text style={[styles.cartButtonText, { color: theme === 'light' ? '#FFF' : '#000' }]}>View Cart</Text>
          {totalItems > 0 && (
            <View style={[styles.badge, { backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}>
              <Text style={[styles.badgeText, { color: theme === 'light' ? '#FFF' : '#000' }]}>{totalItems}</Text>
            </View>
          )}
        </View>
      </ScaleButton>
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
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  productCard: {
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
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartButton: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
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
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  badge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
