"use client"

import React, { useRef, useCallback, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  Paper,
} from "@mui/material"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import ShoppingCart from "@/components/ShoppingCart"
import Footer from "@/components/Footer"
import SkeletonLoader from "@/components/SkeletonLoader"
import useProducts from "@/hooks/useProducts"
import useCart from "@/hooks/useCart"
import useTheme from "@/hooks/useTheme"

export default function ECommerceApp() {
  const {
    products,
    searchTerm,
    isLoading,
    handleSearch,
    handleReset,
    hasSearched,
    loadMoreProducts,
    hasMore,
    removeProduct,
  } = useProducts()
  const { cart, setCart, isCartOpen, setIsCartOpen, addToCart } = useCart()
  const { mode, toggleTheme, theme } = useTheme()
  const [page, setPage] = useState(1)
  const observer = useRef()
  const isMobile = useMediaQuery("(max-width:600px)")

  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore, loadMoreProducts]
  )

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product)
      removeProduct(product.id)
    },
    [addToCart, removeProduct]
  )

  const handleFullReset = useCallback(() => {
    handleReset()
    setCart([])
    setPage(1)
  }, [handleReset, setCart])

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{ minHeight: "100vh" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header
            mode={mode}
            toggleTheme={toggleTheme}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            handleReset={handleFullReset}
            cartItemsCount={cart.length}
            openCart={() => setIsCartOpen(true)}
          />

          <Hero />

          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            {!hasSearched && !isLoading ? (
              <Box textAlign="center" py={8}>
                <Typography variant="h4" gutterBottom>
                  Welcome to Gapsi e-Commerce
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Start by searching for a product or browse our categories
                </Typography>
              </Box>
            ) : (
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SkeletonLoader count={8} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Grid container spacing={3}>
                      <AnimatePresence>
                        {products.map((product, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={product.id}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                                ref={
                                  index === products.length - 1
                                    ? lastProductElementRef
                                    : null
                                }
                              />
                            </motion.div>
                          </Grid>
                        ))}
                      </AnimatePresence>
                    </Grid>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {!isLoading && hasSearched && products.length === 0 && (
              <Box textAlign="center" mt={4}>
                <Typography variant="body1" color="text.secondary">
                  No products found. Try a different search term.
                </Typography>
              </Box>
            )}
            {!isLoading && !hasMore && products.length > 0 && (
              <Box textAlign="center" mt={4}>
                <Typography variant="body1" color="text.secondary">
                  No more products to load
                </Typography>
              </Box>
            )}
          </Container>

          <ShoppingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            isMobile={isMobile}
          />

          <Footer />
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
