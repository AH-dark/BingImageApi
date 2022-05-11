import React from "react";
import {
    AppBar,
    Box,
    IconButton,
    Link, Theme,
    Toolbar,
    Typography, useMediaQuery
} from "@mui/material";
import { GitHub as GitHubIcon, Home as HomeIcon } from "@mui/icons-material";
import { makeStyles, useTheme }                   from "@mui/styles";
import { useRouter }                              from "next/router";

const useStyles = makeStyles({
    root: {
        fontStyle: "inherit",
    },
});

export default function HeaderBar(props: { title: string }) {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));

    const router = useRouter();
    const GoHome = () => {
        router.push("/").then((r: boolean) => console.log(r));
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={"fixed"} className={classes.root}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                        onClick={GoHome}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {props.title}
                    </Typography>
                    <Link
                        href={"https://github.com/AH-dark/bing-image-api"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        color={"inherit"}
                    >
                        <IconButton
                            edge={"end"}
                            size={"large"}
                            aria-label={"github"}
                            sx={{ mr: isMobileSize?undefined:2 }}
                            color={"inherit"}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
