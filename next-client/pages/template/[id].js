import { useRouter } from 'next/router'
import useSWR from "swr";
import CreateEHR from '../../components/CreateEhr'
import beautify from "xml-beautifier";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic insert base64 encoded string here`,
      'Accept': 'application/xml'
    }
  }).then((response) => response.text());
}

const Record = () => {
  const router = useRouter()

  const { data, error } = useSWR(
    `http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4/${router.query.id}`,
    // `http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4/Beatmungswerte`,
    fetcher
  );

  console.log(data)
  if (!error && !data) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <>

      {beautify(data)}
    </>
  );
  return
}

export default Record