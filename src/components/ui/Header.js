import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../../assets/logo2.jpg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "5em",
    [theme.breakpoints.down("md")]: {
      height: "5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
    marginRight: "25px",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 100,
    marginLeft: "25px",
  },
  contactButton: {
    ...theme.typography.contactButton,
    borderRadius: 50,
    marginLeft: "30px",
    marginRight: "50px",
    height: "45px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  drawerIcon: {
    height: "40px",
    width: "40px",
  },
  drawer:{
    backgroundColor: theme.palette.common.blue
  },
  drawerItem:{
    ...theme.typography.tab,
    color:'white',
    opacity: 0.7
  },
  DrawerItemContact:{
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected:{
    "& .MuiListItemText-root": {
      opacity: 1
    }
   
  },
  
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/about" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/resume" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/contact" && value !== 3) {
      setValue(3);
    }
  }, [value]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        className={classes.tabContainer}
      >
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          className={classes.tab}
          component={Link}
          to="about"
          label="About"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="resume"
          label="Resume"
        />
      </Tabs>
      <Button
        className={classes.contactButton}
        component={Link}
        to="contact"
        variant="contained"
        color="secondary"
      >
        Contact me
      </Button>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
      classes={{paper: classes.drawer}}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        

        
        <List disablePadding>
          <ListItem
          selected={value === 0}
          classes={{selected: classes.drawerItemSelected}}
            onClick={() => {setOpenDrawer(false); setValue(0)}}
            divider
            button
            component={Link}
            to="/"
          >
            <ListItemText className= {classes.drawerItem} disableTypography>Home</ListItemText>
          </ListItem>
          <ListItem
          selected={value === 1}
          classes={{selected: classes.drawerItemSelected}}
            onClick={() => {setOpenDrawer(false); setValue(1)}}
            divider
            button
            component={Link}
            to="/about"
          >
              <ListItemText className= {classes.drawerItem} disableTypography>About</ListItemText>
          </ListItem>
          <ListItem
          selected={value === 2}
          classes={{selected: classes.drawerItemSelected}}
            onClick={() => {setOpenDrawer(false); setValue(2)}}
            divider
            button
            component={Link}
            to="/resume"
          >
           <ListItemText className= {classes.drawerItem} disableTypography>Resume</ListItemText>
          </ListItem>
          <ListItem
          selected={value === 3}
          classes={{selected: classes.drawerItemSelected}}
            onClick={() => {setOpenDrawer(false); setValue(3)}}
            divider
            button
            component={Link}
            to="/contact"
          >
            <ListItemText className= {classes.drawerItem} disableTypography>Contact</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer}>
        <MenuIcon
          className={classes.drawerIcon}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
        />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.AppBar} color="primary" position="fixed">
          <Typography variant="h4">
            <Toolbar disableGutters>
              <Button
                disableRipple
                onClick={() => setValue(0)}
                className={classes.logoContainer}
                component={Link}
                to="/"
              >
                <img className={classes.logo} alt="company logo" src={logo} />
              </Button>
              {matches ? drawer : tabs}
            </Toolbar>
          </Typography>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
