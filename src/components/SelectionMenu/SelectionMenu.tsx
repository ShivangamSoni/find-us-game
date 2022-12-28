import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

interface Props {
    characters: Game.Character[];
    onClick: (name: string) => void;
}

export default function SelectionMenu({ characters, onClick }: Props) {
    return (
        <Paper>
            <Typography
                component="h3"
                variant="overline"
                sx={{
                    px: 2,
                    py: 0.5,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1em",
                }}
            >
                Select Character
            </Typography>
            <Divider />
            <MenuList>
                {characters.map(({ id, name, url }) => (
                    <MenuItem key={id} onClick={() => onClick(id)}>
                        <ListItemAvatar>
                            <Avatar alt="" src={url} />
                        </ListItemAvatar>
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </MenuList>
        </Paper>
    );
}
