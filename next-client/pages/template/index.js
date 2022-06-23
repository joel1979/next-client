import useSWR from "swr";
import CreateEHR from "../../components/CreateEhr";
import { useState } from "react";
import { useRouter } from "next/router";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic insert base64 encoded string here`,
      "Content-Type": "application/json",
    },
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
  const { data, error } = useSWR(
    `http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4`,
    fetcher
  );

  console.log(data);

  return (
    <>
      <h2>Upload EHR</h2>
      <textarea
        type="text"
        placeholder=".opt content"
        onChange={(e) => setTemplate(e.target.value)}
      />
      <button onClick={() => upload(template)}>Upload</button>
      <h2>All EHR's</h2>
      {/* <div><pre>{JSON.stringify(data, null, 2)}</pre></div> */}
      <ul>
        {data ? data.map((item) => (
          <li onClick={() => router.push(`/template/${item.template_id}`)}>
            {item.template_id}
          </li>
        )) : null}
      </ul>
    </>
  );
}

export default Ehr;
