import * as React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        px: 2,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.secondary.shade
            : theme.palette.grey[800],
      }}>
      <Container maxWidth="md">
        <Typography align="center" variant="body1">
          Made with 💙 by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://ivan-rodrigues.com"
            style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Ivan Rodrigues
          </a>
        </Typography>
        <Typography align="center" variant="body1">
          Get the source code on{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Ivanho92/travels-counter"
            style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Github
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
