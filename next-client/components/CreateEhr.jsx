import useSWR from "swr";



export default function CreateEhr() {

  function postEhr(url) {
    return fetch('http://localhost:8080/ehrbase/rest/openehr/v1/ehr', {
      method: "POST",
      headers: {
        Authorization: `Basic insert base64 encoded string here`,
        "Content-Type": "application/json",
      }
    }).then((response) => response.json());
  }

  return (
    <button onClick={() => postEhr()}>Create EHR</button>
  )
}