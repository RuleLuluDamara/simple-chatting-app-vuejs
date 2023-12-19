<template>
  <div class="gradient-custom row">
    <div class="col-md-6">
      <form @submit.prevent="addChannels" class="custom-form">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Nama Channel</label>
          <input type="text" class="form-control" id="channels_name" v-model="channels_name" required />
        </div>
        <div id="" class="group-button justify-content-center">
          <button type="submit" class="btn gradient-custom btn-outline-ligth m-2 fw-bold">Add</button>
        </div>
      </form>
      <div id="" class="group-button justify-content-center">
        <button @click="$router.push('/channel')" class="btn btn-outline-light m-2 fw-bold">Back to Channels</button>
      </div>
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

.gradient-custom {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom right, rgba(252, 203, 144, 1), rgba(213, 126, 235, 1));
}
</style>

<script>
import { ref } from "vue";

export default {
  name: "addChannels",
  data() {
    return {
      channels_name: ref(""),
    };
  },
  methods: {
    async addChannels() {
      try {
        const req = await fetch("http://localhost:3100/api/channels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channels_name: this.channels_name,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (req.ok) this.$router.push({ path: "/channel" });
        else this.errors = data.errors[0].message;
      } catch (err) {
        this.errors = err.message;
      }
    },
  },
};
</script>
