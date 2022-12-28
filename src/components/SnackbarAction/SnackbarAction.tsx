import { SnackbarKey, useSnackbar } from "notistack";
import Button from "@mui/material/Button";

interface Props {
    snackbarId: SnackbarKey;
}

export default function SnackbarAction({ snackbarId }: Props) {
    const { closeSnackbar } = useSnackbar();

    return (
        <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => closeSnackbar(snackbarId)}
        >
            Dismiss
        </Button>
    );
}
