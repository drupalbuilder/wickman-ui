<template>

  <div class="p-8 min-h-screen">
    <!-- Container -->

    <div class="max-w-7xl mx-auto">
      <div class="bg-white p-5 rounded-lg shadow-md mb-5">
        <h3 class="text-2xl font-semibold">Select Address:</h3>
      </div>
      <!-- Address List -->
      <div class="mb-6">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8 shadow-md bg-white p-6 rounded-lg">
          <div class="flex justify-between">
            <h3 class="text-lg font-semibold">Billing Address:</h3>
            <button @click="showPopup = true"
              class="md:text-lg lg:text-lg sm:text-base text-[12px] text-black nunito-sans-light">
              + Add Address
            </button>
            </div>
            <ul class="grid w-full gap-6 md:grid-cols-2 mt-5">
              <li v-for="(address, index) in addresses" :key="address.id">
                <!-- Radio button for each address -->
                <input :id="'react-option-' + index" type="radio" :value="address.id" v-model="selectedAddressId"
                  required class="hidden peer" />

                <!-- Label styled as a card -->
                <label :for="'react-option-' + index"
                  class="inline-flex items-center justify-between w-full p-5 text-white rounded-lg cursor-pointer bg-[#c2a8ac] peer-checked:ring-4 peer-checked:ring-[#965D63] relative"
                  @click="toggleCheckbox(index)">
                  <!-- Checkbox positioned at the top right -->
                  <input type="checkbox" :id="'checkbox-' + index" class="absolute top-2 right-2 w-6 h-6 rounded"
                    v-model="address.isChecked" />

                  <div class="block">
                    <div v-if="address.first_name || address.last_name">
                      <p><strong>Name:</strong> {{ address.first_name }} {{ address.last_name }}</p>
                    </div>
                    <div v-if="address.company">
                      <p><strong>Company:</strong> {{ address.company }}</p>
                    </div>
                    <div v-if="address.email">
                      <p><strong>Email:</strong> {{ address.email }}</p>
                    </div>
                    <div v-if="address.phone">
                      <p><strong>Phone:</strong> {{ address.phone }}</p>
                    </div>
                    <div v-if="address.address || address.city || address.state || address.postal_code || address.country">
                      <p><strong>Address:</strong> {{ address.address }}, {{ address.city }}, {{ address.state }}, {{ address.postal_code }} {{ address.country }}</p>
                    </div>
                    <div v-if="address.type">
                      <p><strong>Type:</strong> {{ address.type }}</p>
                    </div>
                  </div>
                </label>
              </li>
            </ul>

            <div class="mt-5">
              <button @click="submitOrder"
                class="w-48 bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">
                Confirm order
              </button>
            </div>
          </div>

          <div class="col-span-12 md:col-span-4 shadow-md bg-white p-6 rounded-lg">
            <!-- Right Column -->
            <div class="flex-grow">
              <h2 class="text-2xl font-semibold">Order summary</h2>
              <div v-for="item in cartItems" :key="item.id" class="border-b border-gray-300 pb-4 mt-5 mb-4">
                <div class="flex items-center gap-4">
                  <img :src="item.product_image ? 'https://awa.gprlive.com/' + item.product_image : 'default-image.jpg'"
                    alt="" class="w-16 h-16 rounded-lg" />
                  <div>
                    <h3 class="font-semibold">{{ item.product_name }}</h3>
                  </div>
                  <span class="ml-auto font-medium">£{{ (item.price * item.quantity).toFixed(3) }}</span>
                </div>
              </div>
              <div class="flex justify-between my-5">
                <span class="text-gray-600">Total</span>
                <span class="font-medium">£{{ totalAmount.toFixed(2) }}</span>
              </div>
              <!-- Hidden input dynamically updates with selected address id -->
              <input :id="'address-id'" type="hidden" name="address-id" v-if="selectedAddressId"
                :value="selectedAddressId" />
              <button @click="submitOrder"
                class="w-full bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="app">
  <!-- Popup Modal -->
  <div v-if="showPopup" class="popup-backdrop" @click.self="closePopup">
    <div class="popup-container rounded-lg bg-white shadow-md">
      <!-- Shipping Information -->
      <h3 class="text-2xl text-center rounded-lg font-semibold bg-[#8a2432] text-white p-6">Add New Address</h3>
      <form class="p-6" @submit.prevent="submitAddress">
        <div class="">
          <label for="email" class="block font-semibold mb-1">Email Address</label>
          <input id="email" v-model="email" type="email" placeholder="Email address" name="email"
            class="w-full border border-gray-300 p-3 mb-6 focus:outline-none" required />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="first-name" class="block font-semibold mb-1">First Name</label>
              <input id="first-name" v-model="firstName" type="text" placeholder="First name" name="first_name"
                class="w-full border border-gray-300 p-3 focus:outline-none" required />
            </div>
            <div>
              <label for="last-name" class="block font-semibold mb-1">Last Name</label>
              <input id="last-name" v-model="lastName" type="text" placeholder="Last name" name="last_name"
                class="w-full border border-gray-300 p-3 focus:outline-none" required />
            </div>
          </div>

          <label for="company" class="block font-semibold mb-1">Company</label>
          <input id="company" v-model="company" type="text" placeholder="Company" name="company"
            class="w-full border border-gray-300 p-3 mb-4 focus:outline-none" />

          <label for="address" class="block font-semibold mb-1">Address</label>
          <input id="address" v-model="address" type="text" placeholder="Address" name="address"
            class="w-full border border-gray-300 p-3 mb-4 focus:outline-none" required />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="city" class="block font-semibold mb-1">City</label>
              <input id="city" v-model="city" type="text" placeholder="City" name="city"
                class="w-full border border-gray-300 p-3 focus:outline-none" required />
            </div>
            <div>
              <label for="country" class="block font-semibold mb-1">Country</label>
              <select id="country" v-model="country" class="w-full border border-gray-300 p-3 focus:outline-none"
                name="country" required>
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="state" class="block font-semibold mb-1">State</label>
              <input id="state" v-model="state" type="text" placeholder="State" name="state"
                class="w-full border border-gray-300 p-3 focus:outline-none" required />
            </div>
            <div>
              <label for="postal-code" class="block font-semibold mb-1">Postal Code</label>
              <input id="postal-code" v-model="postalCode" type="text" placeholder="Postal code" name="postal_code"
                class="w-full border border-gray-300 p-3 focus:outline-none" required />
            </div>
          </div>

          <label for="phone" class="block font-semibold mb-1">Phone</label>
          <input id="phone" v-model="phone" type="text" placeholder="Phone" name="phone"
            class="w-full border border-gray-300 p-3 focus:outline-none" required />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div>
              <button @click="closePopup"
                class="w-full bg-gray-400 md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:bg-gray-500 transition">
                Cancel
              </button>
            </div>
            <div>
              <button @click="submitAddress"
                class="w-full bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showPopup: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US', // Default country
      cartItems: [], // Cart items from API
      addresses: [], // Saved addresses from API
      selectedAddressId: '',
      sameAsBilling: true,
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  },
  methods: {
    toggleCheckbox(index) {
      this.addresses.forEach((address, i) => {
        address.isChecked = i === index; // Only check the current index
      });
    },
    closePopup() {
      this.showPopup = false;
    },

    // Fetch user addresses
    async fetchAddresses() {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log("User Data:", user); // Debugging user data

      if (!user || !user.id) {
        console.error('User not logged in or invalid user ID');
        return;
      }

      const token = sessionStorage.getItem('token'); // Make sure the key is 'token' here
      console.log("Auth Token:", token); // Debugging token

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get(`https://awa.gprlive.com/api/addresses?user_id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Addresses Response:", response); // Debugging API response
        // Ensure addresses is an array
        this.addresses = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        console.error('Error fetching addresses:', error);
        if (error.response && error.response.data.message === "Unauthenticated.") {
          alert("Session expired or authentication failed. Please log in again.");
        }
      }
    },

    // Submit new address
    async submitAddress() {
      if (!this.first_name || !this.last_name || !this.email || !this.phone || !this.address) {
        alert("Please fill all the required fields.");
        return;
      }

      const orderData = {
        first_name: this.first_name,
        last_name: this.last_name,
        city: this.city,
        address: this.address,
        state: this.state,
        postal_code: this.postal_code,
        country: this.country,
        email: this.email,
        phone: this.phone,
      };

      console.log('Order Data:', orderData); // Debugging order data

      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        console.log("User Data:", user); // Debugging user data

        if (!user || !user.id) {
          console.error('User not logged in or invalid user ID');
          return;
        }

        const token = sessionStorage.getItem('token'); // Make sure the key is 'token' here
        console.log("Auth Token:", token); // Debugging token

        const response = await axios.post(`https://awa.gprlive.com/api/address/save?user_id=${user.id}`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Address Save Response:", response); // Debugging API response
        // Update cart items after address save
        this.cartItems = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        console.error('Error submitting order:', error);
        if (error.response && error.response.data.message === "Unauthenticated.") {
          alert("Session expired or authentication failed. Please log in again.");
        }
      }
    },

    // Fetch cart items
    async fetchCartItems() {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log("User Data:", user); // Debugging user data

      if (!user || !user.id) {
        console.error('User not logged in or invalid user ID');
        return;
      }

      const token = sessionStorage.getItem('token'); // Make sure the key is 'token' here
      console.log("Auth Token:", token); // Debugging token

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get(`https://awa.gprlive.com/api/cart/in-checkout?user_id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Cart Items Response:", response); // Debugging cart items response

        this.cartItems = Array.isArray(response.data.data) ? response.data.data : [];

        this.cartItems.forEach(item => {
          if (!item.quantity) {
            item.quantity = 1; // Set default quantity to 1 if not provided
          }
        });
      } catch (error) {
        console.error('Error fetching cart items:', error);
        if (error.response && error.response.data.message === "Unauthenticated.") {
          alert("Session expired or authentication failed. Please log in again.");
        }
      }
    },

    // Submit order
    async submitOrder() {
      const orderData = {
        address_id: this.selectedAddressId,
        cartItems: this.cartItems,
        subtotal: this.totalAmount
      };

      console.log('Order Data for submission:', orderData); // Debugging order submission data

      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        console.log("User Data:", user); // Debugging user data

        if (!user || !user.id) {
          console.error('User not logged in or invalid user ID');
          return;
        }

        const token = sessionStorage.getItem('token'); // Make sure the key is 'token' here
        console.log("Auth Token:", token); // Debugging token

        const response = await axios.post(`https://awa.gprlive.com/api/orders?user_id=${user.id}`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Order Confirmation Response:", response); // Debugging order response

        alert('Order confirmed successfully!');
        // Optionally, you could redirect to a confirmation page here
        // this.$router.push('/order-confirmation');
      } catch (error) {
        console.error('Error submitting order:', error);
        if (error.response && error.response.data.message === "Unauthenticated.") {
          alert("Session expired or authentication failed. Please log in again.");
        }
      }
    }

  },
  created() {
    this.fetchCartItems();
    this.fetchAddresses();
  }
};
</script>




<style scoped>
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  max-width: 800px;
  width: 100%;
}
</style>
