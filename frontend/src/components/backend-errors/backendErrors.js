import { useRouteError } from "react-router-dom"
const AxiosErrors = () => {
    const errorHandler = useRouteError();

    return <div>There is an error !</div>
};

export default AxiosErrors;