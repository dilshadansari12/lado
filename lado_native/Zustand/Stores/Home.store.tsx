import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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




// cart state

// {
//     restaurantId: {
//         restaurantMetaData: { name: "birayni hub" },
//         restaunratItem: [
//             { itemId: 1, item: "biryani", qty: "", message: "", finalPrice: 200 },
//             { itemId: 2, item: "kabab", qty: "", message: "", finalPrice: 200 },
//         ]
//     }
// }

// only allow to add two restaurant order at once;

export const useCartStore = create(
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
                        restaurantMetaData: currentCart[restaurantId]?.restaurantMetaData,
                        restaurantItems: updatedItems,
                    },
                },
            }));
        },
        clearCart: () => set({ cart: {} }),
    })
)

