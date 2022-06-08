import { useRouter } from 'next/router'
import useSWR from "swr";
import CreateEHR from '../../components/CreateEhr'


const Record = () => {
  const router = useRouter()
  console.log(router.query.id)

  function fetcher(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX`,
        "Content-Type": "application/json",
      }
    }).then((response) => response.json());
  }

  const { data: composition } = useSWR(
    router.query.id ? `http://158.126.240.126:8080/ehrbase/rest/openehr/v1/ehr/${router.query.id}}/composition/${router.query.compositionId}` : null,
    fetcher
  );

  console.log(composition)

  //   console.log(error)
  //   if (!error && !data) return <div>loading</div>;
  //   if (error) return <div>error</div>;

  return (
    <>

    </>
  );

}

export default Record