import useSWR from "swr";
import CreateEHR from '../../components/CreateEhr'

function fetcher(url) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic INPUT base64 encoded string here`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q:
        "select e/ehr_id/value as ehrId, e/ehr_status/subject/external_ref/id/value as subjectId, e/ehr_status/subject/external_ref/id/scheme as subjectNamespace from EHR e",
    }),
  }).then((response) => response.json());
}

function Ehr() {
  const { data, error } = useSWR(
    `http://localhost:8080/ehrbase/rest/openehr/v1/query/aql`,
    fetcher
  );

  if (!error && !data) return <div>loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <h2>Send data to INCA</h2>
      <CreateEHR />

    </>
  );
}

export default Ehr;
