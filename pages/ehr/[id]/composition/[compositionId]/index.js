import useSWR from "swr";
// import CreateEHR from '../../components/CreateEhr'
import { useRouter } from 'next/router'

function Compositionx() {
  const router = useRouter()
  console.log(router)
  function fetcher(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic input base64 encoded string here`,
        "Content-Type": "application/json",
      }
    }).then((response) => response.json());
  }

  const { data: composition } = useSWR(
    router.query.id ? `http://localhost:8080/ehrbase/rest/openehr/v1/query/aql/ehrbase/rest/openehr/v1/ehr/${router.query.id}/composition/${router.query.compositionId}` : null,
    fetcher
  );

  console.log(composition)


  //   if (!error && !data) return <div>loading</div>;
  //   if (error) return <div>error</div>;
  return (
    <>
      <p><div><pre>{JSON.stringify(composition, null, 2)}</pre></div></p>

    </>
  );
}

export default Compositionx;
