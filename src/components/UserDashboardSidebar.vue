<template>
  <aside class="w-64 bg-white">
    <!-- Navigation Menu -->
    <nav class="flex-1">
      <ul class="space-y-1">
        <!-- Dashboard -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/dashboard') }]">
          <router-link to="/dashboard"
            class="flex items-center space-x-4 w-full text-gray-800 hover:text-[#8a2432]">
            <i class="fa-solid fa-table-columns text-lg"></i>
            <span class="nunito-sans-light">Dashboard</span>
          </router-link>
        </li>

        <!-- Edit Details -->
        <li :class="['flex items-center px-12 py-3  ', { 'bg-[#f3e9ea]': isActive('/user-profile') }]">
          <router-link to="/user-profile"
            class="flex items-center space-x-4 w-full text-gray-800 hover:text-[#8a2432]">
            <i class="fa-solid fa-user text-lg"></i>
            <span class="nunito-sans-light">Edit Details</span>
          </router-link>
        </li>

        <!-- User Notifications -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/user-notification') }]">
          <router-link to="/user-notification"
            class="flex items-center space-x-4 w-full text-gray-800 hover:text-[#8a2432]">
            <i class="fa-solid fa-bell text-lg"></i>
            <span class="nunito-sans-light">User Notifications</span>
          </router-link>
        </li>

        <!-- User Notifications -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/address') }]">
          <router-link to="/address"
            class="flex items-center space-x-4 w-full text-gray-800 hover:text-[#8a2432]">
            <i class="fa-solid fa-location-dot text-lg"></i>
            <span class="nunito-sans-light">Address</span>
          </router-link>
        </li>



      <!-- WishList -->
      <li :class="['flex items-center px-12 py-3', { 'bg-[#f3e9ea]': isActive('/wishlist') }]">
          <router-link to="/wishlist"
            class="flex items-center space-x-4 w-full text-gray-800 hover:text-[#8a2432]">
            <!-- Star Icon -->
            <i class="fa-solid fa-star text-lg"></i> <!-- Font Awesome star icon -->
            <span class="nunito-sans-light">WishList</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="mt-auto  border-t">
      <button @click="showLogoutConfirmation = true"
        class="flex items-center space-x-4 px-12 w-full py-3  mt-6  text-[#8a2432] hover:text-white hover:bg-[#8a2432]">
        <i class="fa-solid fa-right-from-bracket text-lg"></i>
        <span class="nunito-sans-light">Log Out</span>
      </button>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6  shadow-lg max-w-sm w-full">
        <p class="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to log out?</p>
        <div class="flex space-x-4">
          <button @click="cancelLogout"
            class="px-4 py-2 bg-white hover:bg-gray-200 border-black border w-full text-gray-800 ">
            Cancel
          </button>
          <button @click="confirmLogout" class="px-4 py-2 bg-[#8a2432] hover:bg-red-700 w-full text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      user: {}, // Store user details
      showLogoutConfirmation: false, // Show/hide the logout confirmation modal
    };
  },
  created() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user); // Parse user details
    } else {
      this.$router.push({ name: "LoginUser" }); // Redirect to login if not authenticated
    }
  },
  methods: {
    // Check if the current route matches the given path
    isActive(path) {
      return this.$route.path === path;
    },
    // Cancel logout
    cancelLogout() {
      this.showLogoutConfirmation = false; // Hide the confirmation modal
    },
    // Confirm and execute logout
    confirmLogout() {
      sessionStorage.clear(); // Clear session data
      this.$router.push({ name: "LoginUser" }); // Redirect to login screen
      this.showLogoutConfirmation = false; // Hide the confirmation modal
    },
  },
};
</script>

<style scoped>
aside {
  min-height: 100vh;
}

button {
  transition: all 0.3s ease;
}



.hover\:text-white:hover {
  color: #ffffff;
}
</style>