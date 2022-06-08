import useSWR from "swr";
import CreateEHR from "../../components/CreateEhr";
import { useState } from "react";
import { useRouter } from "next/router";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

function upload(template) {
  return fetch(
    "http://158.126.240.126:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4",
    {
      method: "POST",
      headers: {
        Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
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
    `http://158.126.240.126:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4`,
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
