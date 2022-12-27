import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { TableCellProps } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

interface Columns extends Pick<TableCellProps, "align"> {
    id: number;
    label: string;
}

const COLUMNS: Columns[] = [
    { id: 1, label: "Sr. No.", align: "center" },
    { id: 2, label: "Player Name", align: "left" },
    { id: 3, label: "Time (Min:Sec)", align: "center" },
    { id: 4, label: "Achieved On", align: "center" },
];

const DateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
});

interface Props {
    leaderBoardData: LeaderBoard.Data[];
    onPlayGame: () => void;
}

export default function LeaderBoardTable({
    leaderBoardData,
    onPlayGame,
}: Props) {
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Paper
            sx={{
                height: "100%",
                overflow: "hidden",
            }}
        >
            {leaderBoardData.length === 0 ? (
                <Alert
                    severity="info"
                    action={
                        <Button color="info" onClick={onPlayGame}>
                            Play this Level
                        </Button>
                    }
                >
                    <AlertTitle>No Leader Board Data</AlertTitle>
                    Leader Board not available for the Selected Level.
                </Alert>
            ) : (
                <>
                    <Alert
                        severity="success"
                        action={
                            <Button color="success" onClick={onPlayGame}>
                                Play this Level
                            </Button>
                        }
                        icon={false}
                    >
                        <AlertTitle>
                            Try if you can get a better Time.
                        </AlertTitle>
                    </Alert>
                    <TableContainer sx={{ maxHeight: "90%" }}>
                        <Table stickyHeader size={match ? "small" : "medium"}>
                            <caption>Global Leader Board</caption>
                            <TableHead>
                                <TableRow>
                                    {COLUMNS.map(({ id, align, label }) => (
                                        <TableCell key={id} align={align}>
                                            {label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderBoardData.map(
                                    (
                                        { id, name, completedIn, achievedOn },
                                        idx,
                                    ) => (
                                        <TableRow key={id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                align="center"
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell align="left">
                                                {name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {completedIn}
                                            </TableCell>
                                            <TableCell align="center">
                                                {DateFormatter.format(
                                                    achievedOn,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Paper>
    );
}
