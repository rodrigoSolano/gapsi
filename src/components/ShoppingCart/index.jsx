import PropTypes from "prop-types"
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Fade,
} from "@mui/material"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"

function ShoppingCart({ isOpen, onClose, cart, isMobile }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: isMobile ? "100vw" : 350, p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Shopping Cart
        </Typography>
        <List>
          <AnimatePresence>
            {cart.map((item) => (
              <Fade key={item.id} in={true}>
                <ListItem
                  sx={{
                    mb: 2,
                    backgroundColor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        position: "relative",
                        marginRight: 2,
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2">${item.price}</Typography>
                    </Box>
                  </Box>
                </ListItem>
              </Fade>
            ))}
          </AnimatePresence>
        </List>
        {cart.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            Your cart is empty.
          </Typography>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" align="right">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

export default ShoppingCart
