import useEhr from './hooks/useEhr'

function Ehr() {
    const { ehr, isLoading, isError } = useEhr()
    console.log(ehr)
    if (isLoading) return <div>loading</div>
    if (isError) return <div>error</div>
    return <div>
        <p>id: {ehr.ehr_id.value}</p>
    </div>
}


export default Ehr