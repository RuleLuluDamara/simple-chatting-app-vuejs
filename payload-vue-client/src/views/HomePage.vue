<template>
  <ion-page>
    <section class="gradient-custom">
      <div class="container py-5">
        <section class="vh-100">
          <div class="container py-5 h-100 w-auto">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="title">
                <h3 class="text-center" style="margin-left: 16px; font-weight: bold; font-size: 60px">Welcome To Chating App</h3>
              </div>
              <div class="col col-md-9 col-lg-7 col-xl-5">
                <div class="card" style="border-radius: 15px">
                  <div class="card-body p-4">
                    <div class="d-flex text-black">
                      <div class="flex-shrink-0">
                        <img src="https://picsum.photos/200/200?random&category=people" alt="Generic placeholder image" class="img-fluid" style="width: 180px; border-radius: 10px" />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5 class="mb-1">{{ curUsn }}</h5>
                        <p class="mb-2 pb-1" style="color: #2b2a2a">{{ curEmail }}</p>

                        <div class="d-flex pt-1 justify-content-center">
                          <button type="submit" fill="clear" class="btn gradient-custom btn-rounded btn-lg me-2" style="color: white" @click="router.push('/channel')">Channel</button>
                          <button type="submit" fill="clear" class="btn gradient-custom btn-rounded btn-lg me-2" style="color: white" @click="router.push('/chat')">Personal</button>
                          <!-- <button type="submit" fill="clear" class="btn btn-danger btn-rounded btn-block btn-lg" @click="logout">Logout</button> -->
                        </div>
                        <div class="d-flex justify-content-center pt-1">
                          <!-- <button type="submit" fill="clear" class="btn gradient-custom btn-rounded btn-lg me-2" style="color: white" @click="router.push('/channel')">Channel</button>
                            <button type="submit" fill="clear" class="btn gradient-custom btn-rounded btn-lg me-2" style="color: white" @click="router.push('/chat')">Personal</button> -->
                          <button type="submit" fill="clear" class="btn btn-danger btn-rounded btn-block btn-lg" @click="logout">Logout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const currentUser = ref();
const curUsn = ref();
const curEmail = ref();
const router = useRouter();

const logout = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/accounts/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }

    router.replace("/signin");
  } catch (error: any) {
    alert("Logout Error: " + error.message);
  }
};
// This is called when the page is loaded. It sets up any data that needs to be fetched before rendering the component.
onMounted(async () => {
  currentUser.value = await getUser();
  if (!currentUser.value) router.replace("/signin");
  curUsn.value = currentUser.value.username;
  curEmail.value = currentUser.value.email;

  // console.log(curEmail);
});

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
    // console.log(user);
    return user;
  } catch (error: any) {
    alert("Login Error" + error.message);
  }
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
