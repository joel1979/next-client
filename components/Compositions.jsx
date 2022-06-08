import { useRouter } from 'next/router';
import React from 'react'
import useSWR from "swr";


function Compositions({ ehr }) {
  console.log(ehr)
  const router = useRouter()

  function fetcher2(url) {
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q:
          `select c/context/start_time/value as start_time, c/name/value as name, c/uid/value as uid from EHR e [ehr_id/value='${ehr}'] contains COMPOSITION c`,
      }),
    }).then((response) => response.json());
  }

  const { data: composition } = useSWR(
    ehr ? `http://158.126.240.126:8080/ehrbase/rest/openehr/v1/query/aql` : null,
    fetcher2
  );

  console.log(composition)
  return (
    <div>
      <ul>
        {composition ? composition.rows.map((item, i) => (
          <li key={item}>
            {i + 1}
            <ul onClick={() => router.push(router.asPath + `/composition/${item[2]}`)}>
              {item.map((val, i) => (
                <li key={val}>{composition.columns[i].name}: <strong>{val}</strong></li>
              ))}
            </ul>
          </li>
        )) : <h3>No compositions found!</h3>}
      </ul>
    </div>
  )
}

export default Compositions

