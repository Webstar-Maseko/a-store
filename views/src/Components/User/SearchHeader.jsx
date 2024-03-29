import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CameraIcon from "@material-ui/icons/CameraAltOutlined";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function SearchHeader() {
  const classes = useStyles();

  return (
    <Paper component="form" className={`${classes.root} mediaPhone`}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        id="custom-input"
        placeholder="Search Items, Brands & Categories"
      />

      <IconButton className={classes.iconButton}>
        <CameraIcon />
      </IconButton>
    </Paper>
  );
}
