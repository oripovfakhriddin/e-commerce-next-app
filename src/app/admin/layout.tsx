"use client";

import { Fragment, useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import {
  styled,
  Theme,
  CSSObject,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import NavLink from "@/components/shares/navlink";
import Children from "@/types";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PaymentsIcon from "@mui/icons-material/Payments";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import "./style.scss";
import { Badge } from "@mui/material";
import useAuthStore from "@/store/auth/auth";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffa500",
    },
    secondary: {
      main: "#ff0000",
    },
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminLayout = ({ children }: Children) => {
  const [open, setOpen] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const router = useRouter();

  const { logOut } = useAuthStore();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOutOpenModal = () => {
    setLogOutModal(true);
  };

  const handleLogOutCloseModal = () => {
    setLogOutModal(false);
  };

  const handleLogOut = () => {
    logOut(router);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <div className="admin__header__box">
                <Typography variant="h6" noWrap component="div">
                  Vodiy Parfum
                </Typography>
                <div>
                  <Badge
                    className="notification"
                    badgeContent={4}
                    color="secondary"
                  >
                    <IconButton
                      color="info"
                      onClick={handleLogOutOpenModal}
                      aria-label="notification"
                    >
                      <NotificationsIcon color="info" />
                    </IconButton>
                  </Badge>
                  <IconButton
                    color="secondary"
                    className="log__out__btn"
                    onClick={handleLogOutOpenModal}
                    aria-label="log out"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <div>
                <NavLink href="/admin">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        Dashboard
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
              <div>
                <NavLink href="/admin/users">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        Fodalanuvchilar
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
              <div>
                <NavLink href="/admin/category">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        Mahsulot turlari
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
              <div>
                <NavLink href="/admin/products">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <ProductionQuantityLimitsIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        Mahsulotlar
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
              <div>
                <NavLink href="/admin/payments">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <PaymentsIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        To'lovlar
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
            </List>
            <Divider />
            <List>
              <div>
                <NavLink href="/admin/account">
                  <ListItem
                    key={"text"}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "rgba(0, 0, 0, 0.54)" }}
                        sx={{ opacity: open ? 1 : 0 }}
                      >
                        Hisobim
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </div>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
        <Dialog
          open={logOutModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleLogOutCloseModal}
          aria-describedby="Tasdiqlash uchun"
        >
          <DialogTitle className="dialog__ttle">
            Tadiqlash uchun tugmalardan birini bosing!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p>Akkauntingizdan chiqmoqchimisiz?</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="dialog__button__first"
              variant="contained"
              color="info"
              onClick={handleLogOutCloseModal}
            >
              Bekor qilish
            </Button>
            <Button
              className="dialog__button"
              variant="contained"
              color="error"
              onClick={handleLogOut}
            >
              Chiqish
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
};

export default AdminLayout;
