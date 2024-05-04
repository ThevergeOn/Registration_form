<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Registration</h1>
    <div v-if="currentStep === 1">
      <p>Username:</p>
      <input
        type="text"
        id="username"
        name="username"
        v-model="formData.username"
        class="w-full p-2 border rounded-md mb-4"
        :class="{ 'border-red-500': error }"
      />
    </div>
    <div v-if="currentStep === 2">
      <p>Email:</p>
      <input
        type="text"
        id="email"
        name="email"
        v-model="formData.email"
        class="w-full p-2 border rounded-md mb-4"
        :class="{ 'border-red-500': error }"
      />
    </div>
    <p class="text-red-500" v-if="error">{{ error }}</p>
    <div v-if="currentStep === 3">
      <p>Step: review</p>
      <p>Username: {{ formData.username }}</p>
      <p>Email: {{ formData.email }}</p>
    </div>
    <div class="flex justify-between mt-4">
      <button
        id="btn-prev"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        :disabled="currentStep === 1"
        @click="prevStep"
      >
        Prev
      </button>
      <button
        id="btn-next"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        :disabled="!isNextEnabled"
        @click="nextStep"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      formData: {
        username: "",
        email: "",
      },
      error: "",
      usernameMinLength: 4,
      usernameMaxLength: 30,
      usernameRegex: /^[a-zA-Z0-9\_]+$/,
    };
  },

  computed: {
    emailValid() {
      return /^([^\s@]+)@([^\s@]+)\.test$/.test(this.formData.email);
    },
    usernameValid() {
      if (!this.formData.username) return false;
      return (
        this.usernameRegex.test(this.formData.username) &&
        this.formData.username.length >= this.usernameMinLength &&
        this.formData.username.length <= this.usernameMaxLength
      );
    },
    isNextEnabled() {
      if (this.currentStep === 3) return false;
      return true;
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3 && this.isNextEnabled) {
        if (this.currentStep === 1) {
          if (!this.usernameValid) {
            this.error = "Invalid Username.";
            return;
          }
        } else if (this.currentStep === 2) {
          if (!this.emailValid) {
            this.error = "Invalid email address.";
            return;
          }
        }
        this.currentStep++;
        this.error = "";
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
  },
};
</script>
