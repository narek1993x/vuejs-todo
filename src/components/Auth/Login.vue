<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small outlined @click="handleBack"> <v-icon left> mdi-arrow-left </v-icon>Back </v-btn>
          </v-toolbar>
          <v-card-text v-if="isShowForm">
            <v-form @submit.prevent ref="form" id="login-form" v-model="valid" validation>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                :rules="passwordRules"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="isShowForm">
            <v-spacer></v-spacer>
            <v-btn
              class="mr-2"
              type="submit"
              form="login-form"
              color="primary"
              :disabled="!valid || loading"
              :loading="loading"
              @click="onSubmit"
            >
              Login
            </v-btn>
          </v-card-actions>
          <auth-actions
            v-else
            :loading="loading"
            :onEmail="handleShowForm"
            :onGithub="signInWithGitHub"
            :onGoogle="signInWithGoogle"
          ></auth-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { authMixin } from "../../mixins/auth";
import AuthActions from "./AuthActions";

export default {
  mixins: [authMixin],
  components: { "auth-actions": AuthActions },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  data() {
    return {
      isShowForm: false,
      valid: false,
      email: "",
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be equal or more than 6 characters",
      ],
    };
  },
  methods: {
    handleBack() {
      if (this.isShowForm) {
        this.handleShowForm();
      } else {
        this.$router.push("/");
      }
    },
    handleShowForm() {
      this.isShowForm = !this.isShowForm;
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.signInWithEmailPassword({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style></style>
