import Paper from "@mui/material/Paper";
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
            <MenuList>
                {characters.map(({ name, found, url }) => (
                    <MenuItem key={name} onClick={() => onClick(name)}>
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
