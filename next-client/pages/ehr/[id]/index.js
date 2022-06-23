import { useRouter } from 'next/router'
import useSWR from "swr";
import CreateEHR from '../../../components/CreateEhr'
import Compositions from "../../../components/Compositions";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic insert base64 encoded string here`,
      "Content-Type": "application/json",
    }
  }).then((response) => response.json());
}

const Record = () => {
  const router = useRouter()
  console.log(router)
  const { data, error } = useSWR(
    `http://localhost:8080/ehrbase/rest/openehr/v1/ehr/${router.query.id}`,
    fetcher
  );

  console.log(error)
  if (!error && !data) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <p>EHR: <div><pre>{JSON.stringify(data, null, 2)}</pre></div></p>
      <h2>Compositions</h2>
      <Compositions ehr={router.query ? router.query.id : null} />

    </>
  );
  return
}

export default Record