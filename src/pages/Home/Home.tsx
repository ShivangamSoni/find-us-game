import { useState, useEffect } from "react";

// Firebase
import { db } from "../../firebase";
// Firestore
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import type { TableCellProps } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import { getTimeFromSeconds } from "../../utils/getTimeFromSecs";
import { getFormattedTime } from "../../utils/getFormattedTime";

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

export default function Home() {
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoard.Data[]>([]);

    useEffect(() => {
        (async () => {
            const collectionRef = collection(
                db,
                "game-boards",
                "klSgmEqahQCvfFqBxgbM",
                "scores",
            );

            const scoresQuery = query(
                collectionRef,
                orderBy("completedIn", "asc"),
            );

            const scores: LeaderBoard.Data[] = [];
            const docs = await getDocs(scoresQuery);
            docs.forEach((doc) => {
                const data = doc.data() as LeaderBoard.RawData;
                const completedIn = getFormattedTime(
                    getTimeFromSeconds(data.completedIn),
                );
                scores.push({
                    id: doc.id,
                    name: data.name,
                    completedIn,
                    achievedOn: data.achievedOn.toDate(),
                });
            });

            setLeaderBoard(scores);
        })();
    }, []);

    return (
        <Paper sx={{ height: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "85vh" }}>
                <Table stickyHeader>
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
                        {leaderBoard.map(
                            ({ id, name, completedIn, achievedOn }, idx) => (
                                <TableRow key={id}>
                                    <TableCell
                                        variant="head"
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell align="left">{name}</TableCell>
                                    <TableCell align="center">
                                        {completedIn}
                                    </TableCell>
                                    <TableCell align="center">
                                        {DateFormatter.format(achievedOn)}
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
