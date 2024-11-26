<template>

  <div class="bg-[#f3e9ea] py-1"></div>
  <!-- Breadcrumb Navigation -->
  <nav aria-label="breadcrumb"
    class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light "
    style="max-width: 1536px !important;">
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Account</a>
      </li>
    </ol>
  </nav>


  <div class="flex wapper-max bg-grey container mx-auto  xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    <UserDashboardSidebar />
    <main class="flex-1 px-12  py-6 bg-[#F9E7E966]">
      <h1 class="text-3xl raleway-custom">User Profile</h1>
      <p class="text-gray-500 nunito-sans-light mb-6">Here you can manage your profile settings.</p>

      <!-- User Information -->
      <div class="bg-white  rounded-md border border-[#E496A1]  p-6  mb-6">
        <h2 class="text-2xl raleway-custom font-semibold mb-4">Personal Information</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-center">
            <label class="text-black w-32 nunito-sans-light">Name:</label>
            <span class="text-gray-800 nunito-sans-light">{{ user.name }}</span>
            <button class="ml-2 text-[#8a2432] hover:text-[#8a2430]" @click="editInfo('name')">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>

          <div class="flex items-center">
            <label class="text-black w-32 nunito-sans-light">Email:</label>
            <span class="text-gray-800 nunito-sans-light">{{ user.email }}</span>
            <button class="ml-2 text-[#8a2432] hover:text-[#8a2430]" @click="editInfo('email')">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>

          <div class="flex items-center">
            <label class="text-black w-32 nunito-sans-light">Phone:</label>
            <span class="text-gray-800">{{ user.phone }}</span>
            <button class="ml-2 text-[#8a2432] hover:text-[#8a2430]" @click="editInfo('phone')">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>

          <div class="flex items-center">
            <label class="text-black w-32 nunito-sans-light">Current Address:</label>
            <span class="text-gray-800">{{ user.currentAddress }}</span>
            <button class="ml-2 text-[#8a2432] hover:text-[#8a2430]" @click="editInfo('currentAddress')">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>

          <div class="flex items-center">
            <label class="text-black w-32 nunito-sans-light">Delivery Address:</label>
            <span class="text-gray-800">{{ user.deliveryAddress }}</span>
            <button class="ml-2 text-[#8a2432] hover:text-[#8a2430]" @click="editInfo('deliveryAddress')">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>
      </div>

      <!-- Optional: Add modal or form to handle editing -->
      <div v-if="isEditing" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6  w-1/3">
          <h2 class="text-xl nunito-sans-light mb-4">Edit {{ fieldToEdit }}</h2>
          <input v-model="user[fieldToEdit]" class="border border-gray-300  p-2 mb-4 w-full"
            :placeholder="'Enter new ' + fieldToEdit" />
          <div class="flex justify-end gap-2">
            <button class="bg-gray-300 text-gray-800 p-2 " @click="cancelEdit">Cancel</button>
            <button class="bg-[#8a2432] text-white p-2 " @click="saveEdit">Save</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserDashboardSidebar from "@/components/UserDashboardSidebar.vue";

export default {
  components: {
    UserDashboardSidebar,
  },
  data() {
    return {
      user: {
        name: "", // Empty initially, will be filled from sessionStorage
        email: "", // Empty initially
        phone: "", // Empty initially
        currentAddress: "", // Empty initially
        deliveryAddress: "", // Empty initially
      },
      isEditing: false,
      fieldToEdit: "",
    };
  },
  created() {
    const userData = sessionStorage.getItem("user"); // Get user data from sessionStorage
    if (userData) {
      this.user = JSON.parse(userData); // Parse the user data and assign it to 'user'
    } else {
      this.$router.push({ name: "LoginUser" }); // Redirect to login if no user data is found
    }
  },
  methods: {
    editInfo(field) {
      this.fieldToEdit = field;
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.fieldToEdit = "";
    },
    saveEdit() {
      // Here, you would typically send the updated data to the server via an API call.
      this.isEditing = false;
      this.fieldToEdit = "";
      alert("Changes saved!");
    },
  },
};
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}

button {
  transition: all 0.3s ease;
}

.wapper-max {
  max-width: 1536px !important;
}
</style>