import useSWR from "swr";



export default function CreateEhr() {

  function postEhr(url) {
    return fetch('http://158.126.240.126:8080/ehrbase/rest/openehr/v1/ehr', {
      method: "POST",
      headers: {
        Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
        "Content-Type": "application/json",
      }
    }).then((response) => response.json());
  }

  return (
    <button onClick={() => postEhr()}>Create EHR</button>
  )
}