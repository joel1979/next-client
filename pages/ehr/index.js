import useSWR from "swr";
import CreateEHR from '../../components/CreateEhr'

function fetcher(url) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
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
    `http://158.126.240.126:8080/ehrbase/rest/openehr/v1/query/aql`,
    fetcher
  );

  if (!error && !data) return <div>loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <h2>All EHR's</h2>
      <CreateEHR />
      <ul>
        {data.rows.map((row, i) => (
          <li key={row[0]}>
            {i}: <a href={`/ehr/${row[0]}`}>{row[0]}</a>

          </li>
        ))}
      </ul>
    </>
  );
}

export default Ehr;
