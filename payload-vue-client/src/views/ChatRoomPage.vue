<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start"> <IonBackButton defaultHref="/chat" /> </IonButtons>

        <IonTitle>{{ receiverName }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <!-- <div v-if="errors" class="ion-padding alert alert-danger" role="alert">
        {{ errors }}
        <br />
      </div> -->
      <section class="gradient-custom m-2">
        <div class="container py-2">
          <div class="title">
            <h3 class="text-center" style="margin-left: 16px; font-weight: bold; font-size: 30px">Chat With : {{ receiverName }}</h3>
          </div>
          <div class="row">
            <ul class="list-unstyled">
              <li v-for="(message, index) in messages" :key="index" class="text-white d-flex justify-content-center">
                <div class="card mask-custom" style="width: 50%">
                  <div class="card-header d-flex justify-content-between p-3 m-2" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50px">
                    <img :src="'https://picsum.photos/100/100?random=${randomIndex(people)' + ((index % 10) + 1)" alt="avatar" class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                    <p class="ufw-bold mb-0 text-white" style="font-size: 15px"><span class="fw-bold text-white">Username :</span> {{ message.sender.username }}</p>
                  </div>
                  <div class="card-body m-2">
                    <p class="mb-0 text-white" style="font-size: 15px"><span class="fw-bold">Chat : </span>{{ message.content }}</p>
                  </div>
                </div>
              </li>
              <li v-for="(receiver, index) in receivermessage" :key="index" class="text-white d-flex justify-content-center">
                <div class="card mask-custom" style="width: 50%">
                  <div class="card-header d-flex justify-content-between p-3 m-2" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50px">
                    <img :src="'https://picsum.photos/100/100?random=${randomIndex(people)' + ((index % 10) + 1)" alt="avatar" class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                    <p class="ufw-bold mb-0 text-white" style="font-size: 15px"><span class="fw-bold text-white">Username :</span> {{ receiver.sender.username }}</p>
                  </div>
                  <div class="card-body m-2">
                    <p class="mb-0 text-white" style="font-size: 15px"><span class="fw-bold">Chat : </span>{{ receiver.content }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="m-3">
          <form @submit.prevent="sendMessage" class="custom-form">
            <div class="me-5 ps-5 pb-5 d-flex flex-column align-items-center">
              <label for="content" class="form-label fw-bold" style="font-size: 20px">Message</label>
              <textarea class="form-control" id="content" v-model="content" required style="width: 50%"></textarea>
              <button type="submit" class="btn btn-lg btn-rounded float-end m-2">Send</button>
            </div>
            <!-- <button type="submit" class="btn btn-light btn-lg btn-rounded float-end m-2" @click="router.push('/channel')">Home</button> -->
          </form>
        </div>
        <div v-if="errors" class="col-md-6">
          <div class="alert alert-danger" role="alert">
            {{ errors }}
            <br />
          </div>
        </div>
      </section>

      <!-- <IonList v-if="messages.length > 0">
        <IonItem lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>Username</IonCol>
              <IonCol>Message</IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>

        <IonItem v-for="(message, index) in messages" :key="index" lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>{{ message.sender.username }}</IonCol>
              <IonCol>{{ message.content }}</IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>
      </IonList> -->
    </IonContent>
  </IonPage>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonButtons, IonBackButton } from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonButton,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const messages = ref([]);
    const id = ref("");
    const receiverName = ref("");
    const currentUser = ref("");
    const content = ref("");
    const message = ref("");
    const receivermessage = ref([]);
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id;
      currentUser.value = await getUser();

      try {
        const response = await fetch(`http://localhost:3100/api/accounts/${id.value}`);
        const data = await response.json();
        receiverName.value = data.username;
        // console.log(receiverName);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }

      fetchMessages();
      // trymsg();
    });

    const fetchMessages = async () => {
      try {
        const resp = await fetch(`http://localhost:3100/api/chats`);
        const data = await resp.json();
        messages.value = data.docs.filter((chats) => {
          return chats.sender.id === currentUser.value && chats.receiver.id === id.value;
        });
        receivermessage.value = data.docs.filter((chats) => {
          return chats.receiver.id === currentUser.value && chats.sender.id === id.value;
        });

        // messages.value = data.docs;
        console.log(receivermessage);
        console.log(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const getUser = async () => {
      try {
        const resp = await fetch("http://localhost:3100/api/accounts/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(resp);
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        const user = (await resp.json())?.user;
        return user.id;
      } catch (error) {
        alert("Login Error" + error.message);
      }
    };
    const sendMessage = async () => {
      try {
        const req = await fetch(`http://localhost:3100/api/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.value,
            sender: currentUser.value,
            receiver: id.value,
          }),
        });
        // console.log(content);

        const data = await req.json();
        console.log(req);
        if (req.ok) {
          route.push("/account/" + id.value);
        } else this.errors = data.errors[0].message;
        console.log(data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    return {
      messages,
      id,
      receiverName,
      currentUser,
      content,
      message,
      route,
      fetchMessages,
      receivermessage,
      getUser,
      // trymsg,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));
  height: auto;
}

.btn-rounded {
  border-radius: 20px;
  background-color: white;
  color: grey;
}

.form-control {
  border-radius: 20px;
}

.mask-custom {
  background: rgba(24, 24, 16, 0.2);
  border-radius: 2em;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.05);
  background-clip: padding-box;
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
}
</style>
