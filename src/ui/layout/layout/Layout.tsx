import { Outlet } from "react-router-dom";
import { Grid } from "../grid/Grid";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export const Layout = () => {
  return (
    <Grid space="sm">
      <Nav />

      <Grid space="md">
        <Outlet />
      </Grid>

      <Footer />
    </Grid>
  );
};
