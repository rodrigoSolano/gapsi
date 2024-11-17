import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material"
import Image from "next/image"

function ProductCard({ product, handleAddToCart, lastProductElementRef }) {
  return (
    <Card
      ref={lastProductElementRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "100%" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  lastProductElementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
}

export default ProductCard
