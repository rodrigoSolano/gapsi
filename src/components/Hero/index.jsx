import React from "react"
import { Box, Typography } from "@mui/material"
import Image from "next/image"

function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/hero.jpg"
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        priority
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Welcome to Gapsi e-Commerce
        </Typography>
        <Typography variant="h5" component="h3">
          Discover amazing products at great prices
        </Typography>
      </Box>
    </Box>
  )
}

export default Hero
