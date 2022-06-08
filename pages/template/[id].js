import { useRouter } from 'next/router'
import useSWR from "swr";
import CreateEHR from '../../components/CreateEhr'
import beautify from "xml-beautifier";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
      'Accept': 'application/xml'
    }
  }).then((response) => response.text());
}

const Record = () => {
  const router = useRouter()

  const { data, error } = useSWR(
    `http://158.126.240.126:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4/${router.query.id}`,
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