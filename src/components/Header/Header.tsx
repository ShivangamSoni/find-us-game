import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleDrawerToggle = () => setIsMobileOpen((prev) => !prev);
    const handleNavigation = (link: string) => navigate(link);

    const drawerContainer =
        window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: "flex" }} component="header">
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open navigation drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        Find Us Game
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
                        {NAV_ITEMS.map(({ id, title, link }) => (
                            <Button
                                key={id}
                                color={
                                    pathname === link ? "success" : "secondary"
                                }
                                variant={
                                    pathname === link ? "contained" : "outlined"
                                }
                                onClick={(e) => handleNavigation(link)}
                            >
                                {title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={drawerContainer}
                    variant="temporary"
                    open={isMobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "display": { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DRAWER_WIDTH,
                        },
                    }}
                >
                    <Box
                        onClick={handleDrawerToggle}
                        sx={{ textAlign: "center" }}
                    >
                        <Typography variant="h6" sx={{ my: 2 }}>
                            Find Us Game
                        </Typography>
                        <Divider />
                        <List>
                            {NAV_ITEMS.map(({ id, title, link }) => (
                                <ListItem key={id} disablePadding>
                                    <ListItemButton
                                        sx={{ textAlign: "center" }}
                                        selected={pathname === link}
                                        onClick={(e) => handleNavigation(link)}
                                    >
                                        <ListItemText primary={title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
}

const NAV_ITEMS = [
    {
        id: 1,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        title: "Leader Board",
        link: "/leader-board",
    },
];

const DRAWER_WIDTH = 240;
