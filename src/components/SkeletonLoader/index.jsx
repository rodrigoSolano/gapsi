import { Grid, Skeleton, Card, CardContent, CardActions } from "@mui/material"

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={24} width="80%" />
              <Skeleton variant="text" height={20} width="50%" />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" height={36} width="100%" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default SkeletonLoader
