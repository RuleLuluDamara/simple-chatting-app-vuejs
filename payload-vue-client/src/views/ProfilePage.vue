<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Profiles</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <div v-if="errors" class="ion-padding alert alert-danger" role="alert">
        {{ errors }}
        <br />
      </div>

      <IonList v-if="profiles.length > 0">
        <IonItem lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>ID</IonCol>
              <IonCol>Nama</IonCol>
              <IonCol>Nomor Telepon</IonCol>
              <IonCol>Alamat</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Actions</IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>

        <IonItem v-for="(profile, index) in profiles" :key="index" lines="full">
          <IonLabel>
            <IonRow class="ion-text-center">
              <IonCol>{{ profile.id }}</IonCol>
              <IonCol>{{ profile.nama }}</IonCol>
              <IonCol>{{ profile.telp }}</IonCol>
              <IonCol>{{ profile.alamat }}</IonCol>
              <IonCol>{{ profile.email }}</IonCol>
              <IonCol>
                <IonButton @click="deleteProfile(profile.id)" color="danger">Hapus</IonButton>
                <IonButton @click="navigateToEditProfile(profile.id)" color="warning">Edit</IonButton>
              </IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>
      </IonList>

      <IonButton routerLink="/addprofile" expand="full" color="success">Tambah Profil</IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { ref } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonButtons, IonBackButton } from "@ionic/vue";
import { useRouter } from "vue-router";

const profiles = ref([]);
const errors = ref("");
const router = useRouter();

const getProfiles = async () => {
  try {
    const res = await fetch("http://localhost:3100/api/profiles");
    const data = await res.json();
    profiles.value = data.docs;
  } catch (err) {
    errors.value = err.message;
  }
};

const deleteProfile = async (profileId) => {
  try {
    const req = await fetch(`http://localhost:3100/api/profiles/${profileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    // Handle response as needed
    getProfiles();
  } catch (err) {
    errors.value = err.message;
  }
};

const navigateToEditProfile = (profileId) => {
  router.push(`/editprofile/${profileId}`);
};

// Load profiles when the component is created
getProfiles();
</script>

<style scoped>
/* Add your custom styles here */
</style>
