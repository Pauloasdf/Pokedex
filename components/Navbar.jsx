import { React, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import navbarStyles from "../styles/Navbar.module.css";
import Image from "next/dist/client/image";
import Grid from "@material-ui/core/Grid";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    zIndex: 2000,
    padding: theme.spacing(3),
  },
  paper: {
    background: "#ef5350",
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedTabText, setSelectedTabText] = useState("Pokedex");

  const [waterMarkClassName, setWaterMarkClassName] = useState(
    navbarStyles.waterMark
  );
  const handleDrawerOpen = () => {
    setWaterMarkClassName(navbarStyles.waterMarkMoved);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setWaterMarkClassName(navbarStyles.waterMarkBackToOrigin);
    setOpen(false);
  };

  useEffect(() => {
    handleDrawerOpen();
    handleDrawerClose();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={navbarStyles.navbar}>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h6">{selectedTabText}</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.paper]: true,
          }),
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={navbarStyles.waterMarkContainer}
        >
          <div className={classes.toolbar}>
            <Image
              src="/assets/pokeball-watermark.png"
              height={40}
              width={40}
              className={waterMarkClassName}
            />
          </div>
        </Grid>
        <Divider />
        <List>
          {props.pages.map((page, index) => (
            <ListItem
              button
              key={page.name}
              onClick={() => setSelectedTabText(page.description)}
            >
              <ListItemIcon>
                <Image
                  src={`/assets/${page.iconURL}`}
                  height={page.height}
                  width={page.width}
                />
              </ListItemIcon>
              <ListItemText
                className={navbarStyles.drawerIcons}
                primary={page.name}
              />
            </ListItem>
          ))}
          <ListItem className={classes.bottomPush}>
            <Image src="/assets/logout-icon.png" height={30} width={30} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
