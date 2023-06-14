// pages/[region]/[city].jsx

import { useRouter } from "next/router";
import Head from "next/head";
import cities from "../../src/data/cities";

export async function getStaticProps({ params }) {
  const cityObj = cities.find(
    (city) => city.region === params.region && city.city === params.city
  );
  return {
    props: {
      city: cityObj,
    },
  };
}

export async function getStaticPaths() {
  const paths = cities.map((city) => ({
    params: { region: city.region, city: city.city },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function City({ city }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{`${city.city}, ${city.region}`}</title>
      </Head>
      <h1>{city.city}</h1>
      <p>{city.region}</p>
    </div>
  );
}
