import { Container, Stack, Typography } from "@mui/material"

export default function Home() {
  return (
    <Container sx={{ height: "100vh" }}>
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Typography variant="body1">Hello world!</Typography>
      </Stack>
    </Container>
  )
}
