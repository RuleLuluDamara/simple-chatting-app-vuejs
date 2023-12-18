<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start"> <IonBackButton defaultHref="/" /> </IonButtons>
        <IonTitle>Personal</IonTitle>
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
                  <h3 class="text-center" style="margin-left: 16px; font-weight: bold; font-size: 60px">accounts</h3>
                </div>

                <div v-for="(account, index) in accounts" :key="index" class="card mb-3 mb-3 justify-content-center">
                  <div class="card-body mask-custom">
                    <!-- <h5 class="card-title">{{ account.id }}</h5> -->
                    <!-- <p class="card-text">{{ account.accounts_name }}</p> -->
                    <!-- <button @click="joinaccount(account.id)" class="btn btn-success">Join {{ account.accounts_name }}</button> -->

                    <li class="list-group-item p-1">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                          <img :src="'https://picsum.photos/100/100?random=${randomIndex(avatars)' + ((index % 10) + 1)" alt="avatar" class="rounded-circle me-3 shadow-1-strong" width="60" />
                          <div class="pt-1">
                            <!-- <p class="fw-bold mb-0">{{ account.id }}</p> -->
                            <p class="fw-bold p-2" style="font-size: 20px">{{ account.username }}</p>
                          </div>
                        </div>
                        <div class="pt-1">
                          <!-- <p class="small text-white mb-1">Just now</p> -->
                          <!-- <span class="badge bg-danger float-end">1</span> -->
                          <button @click="joinAccount(account.id)" class="btn btn-success p-3" style="font-weight: bold; color: white">Join {{ account.username }}</button>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>

                <!-- <button type="submit" expand="full" class="btn gradient-custom btn-rounded btn-lg m-2" style="font-weight: bold; width: 50%; color: white" @click="toAddaccount">New account</button> -->
                <button type="submit" expand="full" class="btn gradient-custom btn-rounded btn-lg m-2" style="font-weight: bold; width: 50%; color: white" @click="router.push('/')">Home</button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- <IonList v-if="accounts.length > 0">
        <IonItem lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>ID</IonCol>
              <IonCol>Nama</IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>

        <IonItem v-for="(account, index) in accounts" :key="index" lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>{{ account.id }}</IonCol>
              <IonCol>{{ account.username }}</IonCol>
              <IonCol>
                 <IonButton @click="router.push('/account')" color="success">Join</IonButton> -->
      <!-- <IonButton @click="joinaccount(account.id)" color="success">Join {{ account.username }}</IonButton> -->

      <!-- <IonButton @click="deleteProfile(accounts.id)" color="danger">Hapus</IonButton> -->
      <!-- <IonButton @click="navigateToEditProfile(accounts.id)" color="warning">Edit</IonButton> -->
      <!-- <li class="p-2 border-bottom" style="border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important">
                  <a href="#!" class="d-flex justify-content-between link-light">
                    <div class="d-flex flex-row">
                      <img src="https://picsum.photos/100/100?random=${randomIndex(avatars) + 1}" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                      <div class="pt-1">
                        <p class="fw-bold mb-0">{{ account.id }}</p>
                        <p class="fw-bold mb-0">{{ account.username }}</p>
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

const accounts = ref([]);
const errors = ref("");
const router = useRouter();

const getaccounts = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/accounts");
    const data = await res.json();
    accounts.value = data.docs;
    // console.log(data);
  } catch (err) {
    errors.value = err.message;
  }
};

const toAddaccount = () => {
  router.push(`/addaccount`);
};

const joinAccount = (accountid) => {
  console.log(accountid);
  router.push(`/account/${accountid}`);
};

// Load profiles when the component is created
getaccounts();
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
