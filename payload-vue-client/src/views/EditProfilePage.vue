<script>
import { ref } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonButtons, IonBackButton } from "@ionic/vue";
import { useRouter } from "vue-router";

export default {
  name: "EditProfile",
  data() {
    return {
      nama: ref(""),
      telp: ref(""),
      email: ref(""),
      alamat: ref(""),
      errors: ref(""),
    };
  },
  methods: {
    async getProfileByID() {
      try {
        const res = await fetch("http://localhost:3100/api/profiles/" + this.$route.params.id);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          this.nama = data.nama;
          this.telp = data.telp;
          this.email = data.email;
          this.alamat = data.alamat;
        } else {
          this.errors = data.errors[0].message;
        }
      } catch (err) {
        console.log(err);
        this.errors = err.message;
      }
    },
    async editProfile() {
      try {
        const req = await fetch(`http://localhost:3100/api/profiles/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: this.nama,
            telp: this.telp,
            email: this.email,
            alamat: this.alamat,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) this.$router.push({ path: "/profile" });
        else this.errors = data.errors[0].message;
      } catch (err) {
        console.log(err);
        this.errors = err.message;
      }
    },
  },
  created() {
    this.getProfileByID();
  },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <form v-on:submit.prevent="editProfile" class="custom-form">
        <div class="form-group">
          <label for="nama" class="fw-bold">Nama</label>
          <input type="text" class="form-control" id="nama" v-model="nama" required />
        </div>
        <div class="form-group">
          <label for="telp" class="fw-bold">Nomor Telepon</label>
          <input type="text" class="form-control" id="telp" v-model="telp" required />
        </div>
        <div class="form-group">
          <label for="email" class="fw-bold">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="alamat" class="fw-bold">Alamat</label>
          <input type="text" class="form-control" id="alamat" v-model="alamat" required />
        </div>
        <div id="" class="group-button justify-content-center">
          <button type="submit" class="btn btn-success m-2">Submit</button>
          <button @click="$router.push('/profile')" class="btn btn-success m-2">Kembali ke profile</button>
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
</template>

<style scoped>
/* Add your custom styles here */
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.col-md-6 {
  max-width: 400px; /* Adjust as needed */
  width: 100%;
}

.custom-form {
  padding: 16px;
  text-align: center; /* Center text content */
  color: white;
  background-color: #fff; /* Bootstrap success button color */
  border-radius: 8px; /* Adjust border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-success {
  background-color: #28a745; /* Bootstrap success button color */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
}

.btn-success:hover {
  background-color: #0d3e23; /* Hover color */
}

.alert {
  background-color: #f8d7da; /* Bootstrap danger alert color */
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
}

.form-group {
  margin: 8px; /* Adjust as needed */
  justify-content: center;
}

.form-control {
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  text-align: left;
  padding-left: 20px;
}

label {
  color: black;
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  width: 100%; /* Make label full-width */
}

.group-button {
  display: flex;
  justify-content: center;
  border-radius: 10px;
}

.m-2 {
  margin: 8px; /* Adjust as needed */
}
</style>
