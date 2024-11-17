import { useState, useCallback } from "react"

function useCart() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback(
    (product) => {
      if (!cart.some((item) => item.id === product.id)) {
        setCart((prevCart) => [
          ...prevCart,
          { ...product, addedAt: Date.now() },
        ])
        setIsCartOpen(true)
      }
    },
    [cart]
  )

  return { cart, setCart, isCartOpen, setIsCartOpen, addToCart }
}

export default useCart
