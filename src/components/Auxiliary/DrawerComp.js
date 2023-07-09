// DrawerComp.js
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ActiveLink from "./ActiveLink";
import { Constants } from "../../CONSTANTS";
import ActiveListItemButton from "./ActiveListItemButton";

const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: Constants.secondColor } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map(({ name, id, href }) => (
            <ActiveListItemButton name={name} key={id} href={href} />
          ))}
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
