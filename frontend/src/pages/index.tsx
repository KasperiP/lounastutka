import Footer from "@components/footer/Footer";
import HeroCard from "@components/hero-card/HeroCard";
import Navbar from "@components/navbar/Navbar";
import ResultsCard from "@components/results-card/ResultsCard";
import SearchCard from "@components/search-card/SearchCard";
import TopCard from "@components/top-card/TopCard";
import { VoteContext } from "@context/ContextProvider";
import Layout from "@layouts/Layout";
import { Box, Card, Container, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Head from "next/head";
import {
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import fetcher from "../fetcher";
import {
  ApiResultsCityResponse,
  ApiResultsReponse,
} from "../types/ApiReponses";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const Home = () => {
  const { data, mutate } = useSWR<ApiResultsReponse>(
    "/api/v1/results",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  const [tab, setTab] = useState<number>(0);

  const globalState = useContext(VoteContext);

  //
  // Käytetään restaurants endpointtia, jotta saadaan
  // käyttäjän mahdollinen ääni ja tallennetaan se
  // contextiin. Localstorage kikkailu olisi kanssa
  // mahdollinen, mutta siinä voisi tulla ongelmia jos
  // käyttäjällä ei olekaan ääntä palvelimella. Tälle
  // äänen hakemiselle kannattaisi toki olla oma endpoint..
  //
  useEffect(() => {
    (async () => {
      const res = await fetcher<ApiResultsCityResponse>(
        "/api/v1/restaurants/helsinki"
      );
      globalState?.setVotedRestaurant(res.alreadyVoted);
    })();
  }, [globalState]);

  const handleChange = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const handleVote = async (restaurantId: string) => {
    try {
      await fetch(`/api/v1/vote/${restaurantId}`, {
        method: "POST",
      });

      if (globalState?.votedRestaurant === restaurantId) {
        globalState?.setVotedRestaurant(null);
      } else {
        globalState?.setVotedRestaurant(restaurantId);
      }

      mutate();
    } catch (error) {
      //TODO: Snackbar?
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Lounastutka</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          maxWidth: "100%",
        }}
      >
        <Container maxWidth={false}>
          <Navbar />
          <HeroCard setTab={setTab} />
          <Grid spacing={2} sx={{ mb: 4, mt: 2 }} container>
            <Grid md={4} xs={12} item>
              <TopCard placement={1} result={data} />
            </Grid>
            <Grid md={4} xs={12} item>
              <TopCard placement={2} result={data} />
            </Grid>
            <Grid md={4} xs={12} item>
              <TopCard placement={3} result={data} />
            </Grid>
          </Grid>
          <Card
            sx={{
              py: 5,
              background: "secondary",
            }}
          >
            <Tabs id="content-area" value={tab} onChange={handleChange}>
              <Tab label="Hae ravintoloita" {...a11yProps(0)} />
              <Tab label="Tulostaulukko" {...a11yProps(1)} />
            </Tabs>
            <TabPanel index={0} value={tab}>
              <SearchCard handleVote={handleVote} result={data} />
            </TabPanel>
            <TabPanel index={1} value={tab}>
              <ResultsCard handleVote={handleVote} result={data} />
            </TabPanel>
          </Card>
          <Footer />
        </Container>
      </Box>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
