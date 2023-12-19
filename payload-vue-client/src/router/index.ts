import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SignIn from "@/views/SignInPage.vue";
import SignUp from "@/views/SignUpPage.vue";
// import Profile from "@/views/ProfilePage.vue";
// import AddProfile from "@/views/AddProfilePage.vue";
// import EditProfile from "@/views/EditProfilePage.vue";
import Channel from "@/views/Channelpage.vue";
import AddChannel from "@/views/AddChannelPage.vue";
import EditChannel from "@/views/EditChannelPage.vue";
import ChannelRoom from "@/views/ChannelRoomPage.vue";
import Chat from "@/views/ChatPage.vue";
import ChatRoom from "@/views/ChatRoomPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: Profile,
  // },
  // {
  //   path: "/addprofile",
  //   name: "AddProfile",
  //   component: AddProfile,
  // },
  // {
  //   path: "/editprofile/:id",
  //   name: "editprofile",
  //   component: EditProfile,
  // },
  {
    path: "/channel",
    name: "channel",
    component: Channel,
  },
  {
    path: "/addchannel",
    name: "addchannel",
    component: AddChannel,
  },
  {
    path: "/editchannel/:id",
    name: "editchannel",
    component: EditChannel,
  },
  {
    path: "/channel/:id",
    name: "channelroom",
    component: ChannelRoom,
    props: true,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/account/:id",
    name: "chatroom",
    component: ChatRoom,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
