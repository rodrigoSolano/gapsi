import HttpClient from "@/lib/HttpClient"
import productAdapter from "@/adapters/productAdapter"

export const searchProductsService = async (searchTerm = "", page) => {
  const httpClient = HttpClient.getInstance()

  const response = await httpClient.get(
    `/wlm/walmart-search-by-keyword?keyword=${searchTerm}&page=${page}&sortBy=best_match`
  )

  return (
    response?.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items
      ?.map(productAdapter)
      .filter((product) => product.name && product.price) ?? []
  )
}
