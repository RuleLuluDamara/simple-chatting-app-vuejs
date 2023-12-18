<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{{ channelName }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <!-- <div v-if="errors" class="ion-padding alert alert-danger" role="alert">
        {{ errors }}
        <br />
      </div> -->
      <IonList v-if="messages.length > 0">
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
      </IonList>

      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="sendMessage" class="custom-form">
            <div class="mb-3">
              <label for="content" class="form-label fw-bold">message</label>
              <textarea class="form-control" id="content" v-model="message" required></textarea>
            </div>

            <div id="" class="group-button justify-content-center">
              <button type="submit" class="btn btn-success m-2">Send</button>
            </div>
          </form>
        </div>
        <div v-if="errors" class="col-md-6">
          <div class="alert alert-danger" role="alert">
            {{ errors }}
            <br />
          </div>
        </div>
      </div>

      <ion-button type="submit" fill="clear" color="succes" @click="router.push('/')">Home</ion-button>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonButtons, IonBackButton } from "@ionic/vue";
import { useRoute } from "vue-router";


const messages = ref([]);
const id = ref("");
const channelName = ref("");
const currentUser = ref("");
const content = ref("");
const message = ref("");
const route = useRoute();



onMounted(async () => {
  id.value = route.params.id;
  currentUser.value = await getUser();

  // console.log(currentUser.value);
  try {
    const response = await fetch(`http://localhost:3100/api/channels/${id.value}`);
    const data = await response.json();
    channelName.value = data.channels_name; // Asumsi bahwa 'name' adalah properti yang menyimpan nama channel
    // console.log(channelName);
  } catch (error) {
    console.error("Error fetching channel:", error);
  }

  fetchMessages();
  trymsg();
});

const fetchMessages = async () => {
  try {
    const resp = await fetch(`http://localhost:3100/api/messages`);
    const data = await resp.json();
    messages.value = data.docs;
    // console.log(data);
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

const trymsg = async () => {
  
  try {
    const req = await fetch(`http://localhost:3100/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content.value,
        sender: currentUser,
        channels: id,
      }),
    });
    // console.log(currentUser);

    const data = await req.json();
    // console.log(data);
    // if (req.ok) this.$router.push({ path: "/profile" });
    // else this.errors = data.errors[0].message;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
const sendMessage = async () => {
  
  try {
    const req = await fetch(`http://localhost:3100/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content.value,
        sender: currentUser,
        channels: id,
      }),
    });
    console.log(content);

    const data = await req.json();
    console.log(data);
    // if (req.ok) this.$router.push({ path: "/profile" });
    // else this.errors = data.errors[0].message;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
</script>

<style scoped>
/* Styling */
</style>
