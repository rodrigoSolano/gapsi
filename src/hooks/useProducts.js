import { useState, useCallback, useEffect } from "react"
import { searchProductsService } from "@/services/productService"
import { useDebouncedCallback } from "use-debounce"

function useProducts() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const ITEMS_PER_PAGE = 8

  const searchProducts = useCallback(async (term, pageNumber) => {
    setIsLoading(true)
    try {
      const searchResults = await searchProductsService(
        term,
        pageNumber,
        ITEMS_PER_PAGE
      )
      setProducts((prevProducts) =>
        pageNumber === 1 ? searchResults : [...prevProducts, ...searchResults]
      )
      setHasMore(searchResults.length === ITEMS_PER_PAGE)
      setHasSearched(true)
    } catch (error) {
      console.error("Error searching products:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSearch = useCallback((event) => {
    const term = event.target.value
    setSearchTerm(term)
  }, [])

  const debouncedSearch = useDebouncedCallback((term) => {
    setPage(1)
    searchProducts(term, 1)
  }, 300)

  const handleReset = useCallback(() => {
    setSearchTerm("")
    setProducts([])
    setPage(1)
    setHasMore(true)
    setHasSearched(false)
  }, [])

  const loadMoreProducts = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1
      searchProducts(searchTerm, nextPage)
      setPage(nextPage)
    }
  }, [isLoading, hasMore, searchTerm, page, searchProducts])

  const removeProduct = useCallback((productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    )
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      debouncedSearch(searchTerm)
    } else {
      setIsLoading(false)
      setProducts([])
      setHasSearched(false)
    }
  }, [searchTerm, debouncedSearch])

  return {
    products,
    searchTerm,
    isLoading,
    handleSearch,
    handleReset,
    hasSearched,
    loadMoreProducts,
    hasMore,
    removeProduct,
  }
}

export default useProducts
