import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useStore = create((set) => ({
    bears: 1,
    increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears: any) => set({ bears: newBears }),
}))

export const useFooterStore = create((set) => ({
    showFooter: false,
    setShowFooter: (show: boolean) => set({ showFooter: show }),
}))

export const useCartStore = create(
    persist(
        (set, get: any) => ({
            cart: {},

            addToCart: (item: any) =>
                set((state: any) => ({
                    ...state,
                    cart: {
                        ...state.cart,
                        ...item,
                    }
                })),

            addOrUpdateItem: ({ restaurantId, item }: any) => {
                const currentCart = get().cart;
                const restaurantCart = currentCart[restaurantId]?.restaurantItems || [];

                const updatedItems = (() => {
                    const existing = restaurantCart.find((i) => i.id === item.id);
                    if (existing) {
                        return restaurantCart.map((i) =>
                            i.id === item.id ? { ...i, ...item } : i
                        );
                    }
                    return [...restaurantCart, item];
                })();

                set((state: any) => ({
                    ...state,
                    cart: {
                        ...currentCart,
                        [restaurantId]: {
                            ...currentCart[restaurantId],
                            restaurantItems: updatedItems,
                        },
                    },
                }));
            },

            updateSnacksAndDrinks: ({ restaurantId, item }: any) => {
                const currentCart = get().cart;
                const snacksAndDrinks = currentCart[restaurantId]?.snacksAndDrinks || [];

                const updatedItems = (() => {
                    const existing = snacksAndDrinks.find((i) => i.id === item.id);
                    if (existing) {
                        return snacksAndDrinks.map((i) =>
                            i.id === item.id ? { ...i, ...item } : i
                        );
                    }
                    return [...snacksAndDrinks, item];
                })();

                set((state: any) => ({
                    ...state,
                    cart: {
                        ...currentCart,
                        [restaurantId]: {
                            ...currentCart[restaurantId],
                            snacksAndDrinks: updatedItems,
                        },
                    },
                }));
            },

            clearCart: () => set({ cart: {} }),
        }),
        {
            name: 'cart-storage',
            getStorage: () => AsyncStorage,
        }
    )
);
