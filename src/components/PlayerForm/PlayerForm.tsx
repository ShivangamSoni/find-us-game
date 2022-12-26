// Form Validation
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Filter from "bad-words";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getFormattedTime } from "../../utils/getFormattedTime";

// Bad Word Filter
const filter = new Filter();

// Form Schema
const FormSchema = z.object({
    username: z
        .string()
        .min(3, "Player Name should be at least 3 Characters Long")
        .max(20, "Player Name can't be Longer than 25 Characters"),
});
type FormSchemaType = z.infer<typeof FormSchema>;

interface Props {
    numberOfCharacters: number;
    time: { minutes: number; seconds: number };
    onSubmit: (username: string) => void;
    onCancel: () => void;
}

export default function PlayerForm({
    numberOfCharacters,
    time: { minutes, seconds },
    onSubmit,
    onCancel,
}: Props) {
    const {
        register,
        handleSubmit: generateHandleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: localStorage.getItem("player-name") ?? "",
        },
    });

    const handleSubmit: SubmitHandler<FormSchemaType> = (data) => {
        const username = filter.clean(data.username).replaceAll("*", "").trim();
        localStorage.setItem("player-name", username);
        onSubmit(username);
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={generateHandleSubmit(handleSubmit)}
        >
            <DialogTitle>Submit Score</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You Found all <strong>{numberOfCharacters}</strong>{" "}
                    Characters in{" "}
                    <strong>{getFormattedTime({ minutes, seconds })}</strong>.
                    <br />
                    Enter your Name below for submitting the score to Global
                    Leader Board.
                </DialogContentText>
                <TextField
                    type="text"
                    required
                    margin="dense"
                    variant="standard"
                    label="Your Name"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    disabled={isSubmitting}
                    {...register("username", { required: true })}
                />
            </DialogContent>

            <DialogActions>
                <Button size="small" type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
                <Button
                    size="small"
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Box>
    );
}
