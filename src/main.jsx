import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppLayout } from "./Layout/AppLayout.jsx";
import { Provider } from "react-redux";
import { Store } from "./Store/Store.js";
import { Feed } from "./Components/Feed/Feed.jsx";
import { Watch } from "./Pages/Watch/Watch.jsx";
import { LoginPage } from "./Pages/LoginPage/Loginpage.jsx";
import { Uploadform } from "./Components/UploadVideo/Uploadform.jsx";
import { Profile } from "./Pages/Dashboard/Dashboard.jsx";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import { ProfileWatch } from "./Pages/Dashboard/components/ProfileWatch.jsx";
import { ChannelPage } from "./Pages/UserchannelPage/ChannelPage.jsx";
import { CreateChannelForm } from "./Components/ChannelForm/Channelform.jsx";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Feed />}></Route>
        <Route path="/watch/:id" element={<Watch />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="upload" element={<Uploadform />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="profile/watch/:id" element={<ProfileWatch />}></Route>
        <Route path="profile/channel" element={<ChannelPage />}></Route>
        <Route
          path="profile/createchannel"
          element={<CreateChannelForm />}
        ></Route>
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
