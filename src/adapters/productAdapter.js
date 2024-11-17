// @ts-check

/**
 * @typedef {import("@/types/Product").Product} Product
 */

/**
 * @param {Object} rawProduct
 * @returns {Product}
 */
export default function productAdapter(rawProduct) {
  console.log("rawProduct", rawProduct)

  return {
    id: rawProduct.id,
    name: rawProduct.name,
    description: rawProduct.description,
    price: rawProduct.price,
    imageUrl: rawProduct.image,
  }
}
