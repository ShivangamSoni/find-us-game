import { useLocation, useNavigate } from "react-router-dom";

// MUI
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/ViewList";
import LeaderBoardIcon from "@mui/icons-material/Leaderboard";

const NAV_ITEMS = [
    {
        id: 1,
        label: "Levels",
        link: "/",
        icon: <HomeIcon />,
    },
    {
        id: 2,
        label: "Leader Board",
        link: "/leader-board",
        icon: <LeaderBoardIcon />,
    },
];

interface Props {
    isMobile: boolean;
    isGamePage: boolean;
}

export default function Header({ isMobile, isGamePage }: Props) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (link: string) => navigate(link);

    return (
        <Paper
            component="header"
            sx={{
                position: "fixed",
                ...(isMobile || isGamePage ? { bottom: 0 } : { top: 0 }),
                left: 0,
                right: 0,
                zIndex: 99,
                display: "grid",
                placeItems: "center stretch",
            }}
            elevation={3}
        >
            <Box component="nav">
                <BottomNavigation
                    showLabels
                    value={pathname}
                    onChange={(e, link) => handleNavigation(link)}
                >
                    {NAV_ITEMS.map(({ id, label, link, icon }) => (
                        <BottomNavigationAction
                            role="link"
                            key={id}
                            label={label}
                            icon={icon}
                            value={link}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        </Paper>
    );
}
