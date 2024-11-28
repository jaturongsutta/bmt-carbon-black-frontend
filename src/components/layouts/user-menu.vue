<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-icon icon="mdi-dots-vertical-circle-outline" v-bind="props"></v-icon>
      </template>

      <v-list>
        <v-list-item @click="userProfileClick">
          <v-list-item-title>User Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changePasswordClick">
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item>
        <v-list-item @click="applicationInformationClick" v-if="isAdmin">
          <v-list-item-title>Application Information</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialogChangePassword" width="auto">
      <v-form ref="frmChangePassword" validate-on="submit">
        <v-card>
          <v-card-title>
            <span class="headline">Change Password</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <label class="require-field">Old Password</label>
                  <v-text-field
                    type="password"
                    v-model="oldPassword"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="require-field">New Password</label>
                  <v-text-field
                    type="password"
                    v-model="newPassword"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="require-field">Confirm Password</label>
                  <v-text-field
                    type="password"
                    v-model="confirmPassword"
                    :rules="[rules.required, validatePasswordMatch]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>
          <div class="d-flex justify-center py-3">
            <n-btn-save
              @click="saveChangePasswordClick"
              class="me-3"
              no-permission
            ></n-btn-save>
            <n-btn-cancel
              text
              @click="dialogChangePassword = false"
            ></n-btn-cancel>
          </div>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref, inject, onMounted } from "vue";
import rules from "@/utils/rules";
import axios from "axios";
export default {
  setup() {
    const isAdmin = ref(false);
    const Alert = inject("Alert");
    const dialogChangePassword = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const frmChangePassword = ref(null);

    const oldPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");

    onMounted(() => {
      isAdmin.value = authStore.user.userId === 1; // System user
    });

    const userProfileClick = () => {
      console.log("User Profile Clicked ");
      router.push({ name: "user-info", params: { id: authStore.user.userId } });
    };

    const changePasswordClick = () => {
      console.log("Change Password Clicked");
      newPassword.value = "";
      confirmPassword.value = "";
      oldPassword.value = "";
      dialogChangePassword.value = true;
    };

    const applicationInformationClick = () => {
      router.push({ name: "application-information" });
    };

    const validatePasswordMatch = () => {
      return (
        newPassword.value === confirmPassword.value || "Password does not match"
      );
    };

    const saveChangePasswordClick = () => {
      frmChangePassword.value.validate().then((valid) => {
        if (valid) {
          console.log("Save Clicked");
          axios
            .post("/user/change-password", {
              userId: authStore.user.userId,
              oldPassword: oldPassword.value,
              newPassword: newPassword.value,
            })
            .then(async (res) => {
              if (res.data.status === 0) {
                await Alert.success("Password has been changed successfully");
                dialogChangePassword.value = false;
              } else if (res.data.status === 1) {
                Alert.warning(res.data.message);
              } else {
                Alert.error(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
              Alert.error(error.message);
            });
        }
      });
    };
    return {
      isAdmin,
      oldPassword,
      newPassword,
      confirmPassword,
      dialogChangePassword,
      frmChangePassword,
      userProfileClick,
      changePasswordClick,
      applicationInformationClick,
      validatePasswordMatch,
      saveChangePasswordClick,
      rules,
    };
  },
};
</script>
