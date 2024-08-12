import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import VillaOutlined from "@mui/icons-material/VillaOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  GitHubBanner,
  AuthProvider,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  useNotificationProvider,
  ReadyPage,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { Header, Layout, Sider, Title } from "./components/layout";
import { ColorModeContextProvider } from "./contexts";
import type { CredentialResponse } from "./interfaces/google";
import { parseJwt } from "./utils/parse-jwt";

import {
  AgentProfile,
  Agents,
  AllProperties,
  CreateProperty,
  EditProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
} from "./pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          }),
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <ColorModeContextProvider>
      <GitHubBanner />
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("https://the-desk-server.vercel.app/api/v1")}
          notificationProvider={useNotificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "reviews",
              list: Home,
              icon: <StarOutlineRounded />,
            },
            {
              name: "messages",
              list: Home,
              icon: <ChatBubbleOutline />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
