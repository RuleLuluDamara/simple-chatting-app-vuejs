<template>
  <ion-page>
    <!-- <ion-list :inset="true">
        <form @submit.prevent="handleLogin">
          <ion-item>
            <ion-input v-model="email" name="email" label="Email" label-placement="stacked" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" name="password" label="Password" label-placement="stacked" type="password"></ion-input>
          </ion-item>
          <div class="ion-text-center">
            <ion-button type="submit" fill="clear">Sign In</ion-button>
            <ion-button type="button" fill="clear" @click="router.push('/signup')">Create A New Account</ion-button>
          </div>
        </form>
      </ion-list> -->
    <!--       
  <div class="vh-100 gradient-custom">
    <h3 class="ml-3">Sign In</h3>
    <form @submit.prevent="handleLogin">
      <div class="form-outline mb-4">
        <label for="email">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" required />
      </div>
      <div class="form-outline mb-4">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" required />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-block m-4">Sign In</button>
      </div>
    </form>
    <div class="text-center">
      <p>Not a member?</p>
      <button type="button" class="btn btn-link btn-floating mx-1" @click="router.push('/signup')">Register</button>
    </div>
  </div> -->
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <form @submit.prevent="handleLogin">
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-white-50 mb-5">Please enter your login and password!</p>

                    <div class="form-outline form-white mb-4">
                      <label for="email" class="form-label">Email</label>
                      <input v-model="email" type="email" class="form-control form-control-lg" id="email" required />
                    </div>

                    <div class="form-outline form-white mb-4">
                      <label for="password" class="form-label">Password</label>
                      <input v-model="password" type="password" class="form-control form-control-lg" id="password" required />
                    </div>
                    <button type="submit" class="btn btn-outline-light btn-lg px-5" tappable>Sign In</button>
                  </form>
                </div>

                <div>
                  <p class="mb-0 text-white-50 fw-bold">Don't have an account?<button type="button" class="btn btn-link" style="color: aliceblue" tappable @click="router.push('/signup')">Register</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonButton, IonItem, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const router = useRouter();

/**
 *
 */
const handleLogin = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/accounts/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    // console.log(resp);
    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    // const user = await resp.json();
    // console.log(user);
    router.replace("/");
  } catch (error: any) {
    alert("Sign in Error" + error.message);
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
