import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Landing() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <img src="./logo-group.svg" alt="" className="kyb" height="50" />

            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
              <Typography
                sx={{ fontSize: 14, mr: 4, fontWeight: 500, color: "#1B404B" }}
              >
                Home
              </Typography>
              <Typography
                sx={{ fontSize: 14, mr: 4, fontWeight: 500, color: "#1B404B" }}
              >
                Features
              </Typography>
              <Typography
                sx={{ fontSize: 14, mr: 4, fontWeight: 500, color: "#1B404B" }}
              >
                About
              </Typography>
              <Typography
                sx={{ fontSize: 14, mr: 4, fontWeight: 500, color: "#1B404B" }}
              >
                Contact
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ mt: 20, display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography
                sx={{ color: "#1B404B", fontSize: 48, fontWeight: 950, mb: 1 }}
              >
                Automate your <br></br>
                </Typography>
                <Typography
                  sx={{ color: "#1564E8", fontSize: 48, fontWeight: 950 }}
                >
                  "Know your Business" <br></br>
                </Typography>
                <Typography
                sx={{ color: "#1B404B", fontSize: 48, fontWeight: 950, mb: 5 }}
              >
                process <br></br>
              </Typography>

              <Typography sx={{ color: "#1B404B", fontSize: 16, mt: 1 }}>
                <img src="./lock.svg"></img>Automate KYB activity
              </Typography>
              <Typography sx={{ color: "#1B404B", fontSize: 16, mt: 1 }}>
                <img src="./lock.svg"></img>Onboard customers
              </Typography>
              <Typography sx={{ color: "#1B404B", fontSize: 16, mt: 1 }}>
                <img src="./lock.svg"></img>KYB profile generation
              </Typography>
              <Typography sx={{ color: "#1B404B", fontSize: 16, mt: 1 }}>
                <img src="./lock.svg"></img>KYB Verifiable Identity Card
              </Typography>
            </Box>

            <img src="./graphic.png" height="100%"></img>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 18 }}
          >
            <img src="./illustration.svg" height="100%"></img>

            <Box>
              <Typography
                sx={{ color: "#1B404B", fontSize: 26, fontWeight: 700 }}
              >
                KYB data storage. Great user <br />
                experiences. No compromise.
              </Typography>
              <Typography sx={{ color: "#1B404B", fontSize: 16, mt: 4 }}>
                Rapidly onboard new customers. Collect a set of business
                attributes
                <br />
                and populate the KYB data profile of a company. Store the KYB{" "}
                <br />
                profile as “Verifiable Data” and get your KYB Verifiable
                Identity Card.
              </Typography>

              <Button
                variant="contained"
                size="large"
                disableElevation
                sx={{ mt: 4 }}
              >
                Issue your KYB Verifiable Identity Card
              </Button>
            </Box>
          </Box>
        </Container>
        <Box sx={{ backgroundColor: "#F6F7F8", py: 5 }}>
          <Box
            sx={{
              backgroundColor: "white",
              mx: 20,
              my: 8,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{ color: "#1B404B", fontSize: 26, fontWeight: 700, pt: 4 }}
              align="center"
            >
              Book a demo <br />
            </Typography>
            <Typography
              sx={{ color: "#1B404B", fontSize: 16, pt: 2, pb: 4 }}
              align="center"
            >
              We would love to show you what GRIDS KYB Custodian can do! Book a
              demo or <br /> alternatively, watch a video demonstrating GRIDS
              KYB Custodian capabilities. <br />
            </Typography>
            <Button
              variant="contained"
              size="large"
              disableElevation
              sx={{ mb: 4 }}
            >
              Book a demo
            </Button>
          </Box>
        </Box>
        <Container>
          <Grid container spacing={5} sx={{ pt: 12, mb: 2 }}>
            <Grid item md={2} xs={4}>
              <img src="./cef.png" alt="cef" />
            </Grid>
            <Grid item md={6} xs={8}>
              <Typography>
                The GRIDS KYB Custodian Service has been co-financed by the{" "}
                <a href="https://ec.europa.eu/inea/en/connecting-europe-facility">
                  {" "}
                  Connecting Europe Facility (CEF)
                </a>{" "}
                of the European Union | <br />
                GRIDS Project: Grant Agreement No INEA/CEF/ICT/A2019/1926018
              </Typography>{" "}
              <br />
            </Grid>

            <Grid item md={4} xs={12}>
              <Grid container>
                <Typography sx={{ mb: 2, mr: 2 }}>
                  Developed by{" "}
                  <a href="http://www.atlantis-group.gr/i4Mlab">
                    {" "}
                    UAegean i4m Lab{" "}
                  </a>
                  , <a href="https://www.kompany.com/">Kompany</a> and{" "}
                  <a href="https://www.grids-cef.eu/">GRIDS Consortium</a>
                </Typography>
                <Grid>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    Contact:
                  </Typography>{" "}
                </Grid>

                <Grid sx={{ mr: 1 }}>
                  <a href="mailto:i4mlab@uaegean">
                    <img
                      src="./mail.svg"
                      height="35"
                      alt="kompany"
                      className="facebook"
                    />
                  </a>{" "}
                </Grid>
                <Grid sx={{ mr: 1 }}>
                  {" "}
                  <a href="https://www.linkedin.com/showcase/grids-kyb-custodian">
                    <img
                      src="./linkedin.svg"
                      height="35"
                      alt="linkedin"
                      className="twitter"
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
}
