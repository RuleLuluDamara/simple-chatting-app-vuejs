<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start"> <IonBackButton defaultHref="/" /> </IonButtons>
        <IonTitle>Channel</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <div v-if="errors" class="ion-padding alert alert-danger" role="alert">
        {{ errors }}
        <br />
      </div>
      <section class="gradient-custom">
        <div class="container py-5 m-5">
          <section class="vh-100">
            <div class="container py-5 h-100 w-auto">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="title">
                  <h3 class="text-center" style="margin-left: 16px; font-weight: bold; font-size: 60px">Channels</h3>
                </div>

                <div v-for="(channel, index) in channels" :key="index" class="card mb-3 mb-3 justify-content-center">
                  <div class="card-body mask-custom">
                    <!-- <h5 class="card-title">{{ channel.id }}</h5> -->
                    <!-- <p class="card-text">{{ channel.channels_name }}</p> -->
                    <!-- <button @click="joinChannel(channel.id)" class="btn btn-success">Join {{ channel.channels_name }}</button> -->

                    <li class="list-group-item p-1">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img :src="'https://picsum.photos/100/100?random=${randomIndex(avatars)' + ((index % 10) + 1)" alt="avatar" class="rounded-circle me-3 shadow-1-strong" width="60" />
                          <div class="pt-1">
                            <!-- <p class="fw-bold mb-0">{{ channel.id }}</p> -->
                            <p class="fw-bold p-2" style="font-size: 20px">{{ channel.channels_name }}</p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <!-- <p class="small text-white mb-1">Just now</p> -->
                          <!-- <span class="badge bg-danger float-end">1</span> -->
                          <button @click="joinChannel(channel.id)" class="btn btn-success p-3" style="font-weight: bold; color: white">Join {{ channel.channels_name }}</button>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>

                <button type="submit" expand="full" class="btn gradient-custom btn-rounded btn-lg m-2" style="font-weight: bold; width: 50%; color: white" @click="toAddChannel">New Channel</button>
                <button type="submit" expand="full" class="btn gradient-custom btn-rounded btn-lg m-2" style="font-weight: bold; width: 50%; color: white" @click="router.push('/')">Home</button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- <IonList v-if="channels.length > 0">
        <IonItem lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>ID</IonCol>
              <IonCol>Nama</IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>

        <IonItem v-for="(channel, index) in channels" :key="index" lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>{{ channel.id }}</IonCol>
              <IonCol>{{ channel.channels_name }}</IonCol>
              <IonCol>
                 <IonButton @click="router.push('/channel')" color="success">Join</IonButton> -->
      <!-- <IonButton @click="joinChannel(channel.id)" color="success">Join {{ channel.channels_name }}</IonButton> -->

      <!-- <IonButton @click="deleteProfile(channels.id)" color="danger">Hapus</IonButton> -->
      <!-- <IonButton @click="navigateToEditProfile(channels.id)" color="warning">Edit</IonButton> -->
      <!-- <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                  <a href="#!" class="d-flex justify-content-between link-light">
                    <div class="d-flex flex-row">
                      <img src="https://picsum.photos/100/100?random=${randomIndex(avatars) + 1}" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                      <div class="pt-1">
                        <p class="fw-bold mb-0">{{ channel.id }}</p>
                        <p class="fw-bold mb-0">{{ channel.channels_name }}</p>
                      </div>
                    </div>
                    <div class="pt-1">
                      <p class="small text-white mb-1">Just now</p>
                      <span class="badge bg-danger float-end">1</span>
                    </div>
                  </a>
                </li>
              </IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>
      </IonList> -->
    </IonContent>

    <!-- <section class="gradient-custom">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
            <h5 class="font-weight-bold mb-3 text-center text-white">Member</h5>

            <div class="card mask-custom">
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">John Doe</p>
                          <p class="small text-white">Hello, Are you there?</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">Just now</p>
                        <span class="badge bg-danger float-end">1</span>
                      </div>
                    </a>
                  </li>
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Danny Smith</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">5 mins ago</p>
                      </div>
                    </a>
                  </li>
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Alex Steward</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Ashley Olsen</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Kate Moss</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Lara Croft</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li class="p-2">
                    <a href="#!" class="d-flex justify-content-between link-light">
                      <div class="d-flex flex-row">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                        <div class="pt-1">
                          <p class="fw-bold mb-0">Brad Pitt</p>
                          <p class="small text-white">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div class="pt-1">
                        <p class="small text-white mb-1">5 mins ago</p>
                        <span class="text-white float-end"><i class="fas fa-check" aria-hidden="true"></i></span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </IonPage>
</template>

<script setup>
import { ref } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonButtons, IonBackButton } from "@ionic/vue";
import { useRouter } from "vue-router";

const channels = ref([]);
const errors = ref("");
const router = useRouter();

const getchannels = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/channels");
    const data = await res.json();
    channels.value = data.docs;
    // console.log(data);
  } catch (err) {
    errors.value = err.message;
  }
};

const toAddChannel = () => {
  router.push(`/addchannel`);
};

const joinChannel = (channelid) => {
  console.log(channelid);
  router.push(`/channel/${channelid}`);
};

// Load profiles when the component is created
getchannels();
</script>

<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));
}
.card {
  background-color: transparent;
  border-color: transparent;
  width: 50%;
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
