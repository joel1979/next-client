import useSWR from "swr";
import CreateEHR from "../../components/CreateEhr";
import Composition from "../../components/Composition";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function fetcher(url) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic insert base64 encoded string here`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q:
        "select e/ehr_id/value as ehrId, e/ehr_status/subject/external_ref/id/value as subjectId, e/ehr_status/subject/external_ref/id/scheme as subjectNamespace from EHR e",
    }),
  }).then((response) => response.json());
}



function upload(template) {
  return fetch(
    "http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4",
    {
      method: "POST",
      headers: {
        Authorization: `Basic insert base64 encoded string here`,
        "Content-Type": "application/xml",
        accept: "application/json",
      },
      body: template,
    }
  ).then((response) => console.log(response.json()));
}

function Ehr() {
  const router = useRouter();
  const [templates, setTemplate] = useState();
  const [selectedEhr, setSelectedEhr] = useState();


  useEffect(() => {
    console.log(selectedEhr)
    if (selectedEhr) router.push(`/composition/${selectedEhr}`)
  }, [selectedEhr])
  // function fetcher2(url) {
  //   return fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic insert base64 encoded string here`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       q:
  //         `select c/context/start_time/value as start_time, c/name/value as name, c/uid/value as uid from EHR e [ehr_id/value='${ehr_id}'] contains COMPOSITION c`,
  //     }),
  //   }).then((response) => response.json());
  // }

  // console.log(ehr)
  const { data: ehr_id } = useSWR(
    `http://localhost:8080/ehrbase/rest/openehr/v1/query/aql`,
    fetcher
  );
  // const { data: composition } = useSWR(
  //   () =>`http://localhost:8080/ehrbase/rest/openehr/v1/query/aql`,
  //   fetcher2
  // );

  console.log(ehr_id);
  // console.log(composition);

  return (
    <>
      <label for="ehrs">Select EHR </label>
      <select name="ehrs" onChange={(e) => setSelectedEhr(e.target.value)} >
        {ehr_id?.rows.map((item) => (
          <option key={item[0]} value={item[0]} >
            {item[0]}
          </option>
        ))}
      </select>
      <br />
      <Composition ehr={selectedEhr ? selectedEhr : null} />
      {/* selected EHR: {selectedEhr} */}


    </>
  );
}

export default Ehr;
