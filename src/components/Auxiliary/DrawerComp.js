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
            <ListItemButton onClick={() => setOpen(false)} key={id} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  <ActiveLink key={id} href={href}>
                    {name}
                  </ActiveLink>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
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
