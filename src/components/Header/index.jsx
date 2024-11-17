import React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Badge,
  InputAdornment,
} from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import RefreshIcon from "@mui/icons-material/Refresh"
import SearchIcon from "@mui/icons-material/Search"

import Image from "next/image"

function Header({
  mode,
  toggleTheme,
  searchTerm,
  handleSearch,
  handleReset,
  cartItemsCount,
  openCart,
}) {
  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo.png"
            alt="Gapsi Logo"
            width={40}
            height={40}
            style={{ marginRight: "16px" }}
          />
          <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
          >
            e-Commerce Gapsi
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            size="small"
            sx={{ width: { xs: "100%", sm: "300px", md: "400px" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={openCart} color="inherit">
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleReset} color="inherit" aria-label="Reset">
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle theme"
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toggleTheme: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
  openCart: PropTypes.func.isRequired,
}

export default Header
