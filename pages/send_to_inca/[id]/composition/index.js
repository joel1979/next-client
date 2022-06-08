import useSWR from "swr";
// import CreateEHR from '../../components/CreateEhr'
import { useRouter } from 'next/router'

// function fetcher(url) {
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic bXlhZG1pbjpteVN1cGVyQXdlc29tZVBhc3N3b3JkMTIz`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       q:
//         "select e/ehr_id/value as ehrId, e/ehr_status/subject/external_ref/id/value as subjectId, e/ehr_status/subject/external_ref/id/scheme as subjectNamespace from EHR e",
//     }),
//   }).then((response) => response.json());
// }

function Composition() {
    const router = useRouter()

    console.log(router)
//   const { data, error } = useSWR(
//     `http://localhost:8080/ehrbase/rest/openehr/v1/query/aql`,
//     fetcher
//   );

//   if (!error && !data) return <div>loading</div>;
//   if (error) return <div>error</div>;
  return (
    <>

   </>
  );
}

export default Composition;
