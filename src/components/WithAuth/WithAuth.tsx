import { Navigate } from "react-router-dom";

import { useSnackbar } from "notistack";

import { useAuthCtx } from "../../Context/AuthContext";

interface Props {
    children: JSX.Element;
}

export default function WithAuth({ children }: Props) {
    const { isAuth } = useAuthCtx();
    const { enqueueSnackbar } = useSnackbar();

    if (!!isAuth) {
        return children;
    }

    enqueueSnackbar("Please, Sign In to Play the Game!", {
        variant: "info",
    });
    return <Navigate to="/" />;
}
