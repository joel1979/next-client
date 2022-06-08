import useSWR from 'swr'

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      'Authorization': `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
      'Content-Type': 'application/json',
      'cors': 'no-cors',
    },
    body: {
      q: 'select e/ehr_id/value as ehrId, e/ehr_status/subject/external_ref/id/value as subjectId, e/ehr_status/subject/external_ref/id/scheme as subjectNamespace from EHR e ORDER BY e/ehr_status/subject/external_ref/id/value ASC'
    }
  }).then(response => response.json());
}


export default function useEhr(id) {

  const { data, error } = useSWR(`http://158.126.240.126:8080/ehrbase/rest/openehr/v1/ehr/b84ac8b3-deba-4b70-a0b7-c5165f6b20b0`, fetcher)
  return {
    ehr: data,
    isLoading: !error && !data,
    isError: error
  }
}


