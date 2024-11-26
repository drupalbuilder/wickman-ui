<template>
  <div class="bg-[#f9f5f6] p-16 min-h-screen">
    <div class="container wapper-max mx-auto border border-red-200 rounded-lg p-10 bg-white">
      <h2 class="font-semibold raleway-custom md:text-lg lg:text-2xl sm:text-base text-[12px] text-gray-700 mb-2">Cart</h2>
      <p class="mb-10 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">{{ cartItems.length }} items in your bag.</p>

      <!-- If there are items in the cart -->
      <div class="" v-if="cartItems.length">
        <!-- Table Header -->
        <div class="grid items-center grid-cols-10 gap-4 py-2 mb-4 font-semibold text-gray-700 border-t border-b border-gray-300 justify-center">
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Lot Image</div>
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Lot No.</div>
          <div class="col-span-4 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Lot Title</div>
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Lot Price</div>
        </div>

        <!-- Loop over cart items -->
        <div v-for="item in cartItems" :key="item.id" class="mb-4">
          <!-- Table Row for Cart Item -->
          <div class="grid items-center grid-cols-10 gap-4 py-4 justify-items-center">
            <!-- Image Column -->
            <div class="col-span-2 flex justify-center">
              <img :src="item.product_image ? `https://awa.gprlive.com/${item.product_image}` : 'default-image.jpg'" :alt="item.product_name" class="object-cover w-16 h-16 rounded-md" />
            </div>

            <!-- Lot No. Column -->
            <div class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
              <h3 class="font-semibold">{{ item.product_name }}</h3>
            </div>

            <!-- Title Column -->
            <div class="col-span-4 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
              <h3 class="font-semibold">{{ item.product_name }}</h3>
            </div>

            <!-- Price Column -->
            <div class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
              £{{ parseFloat(item.price).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- If no items in the cart -->
      <div v-else>
        <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">Your cart is empty.</p>
      </div>

      <!-- Checkout Button -->
      <div class="text-end mt-8 me-20">
        <!-- Total Section -->
        <div class="mb-4"> <!-- Added margin-bottom to separate Total and Checkout -->
          <span class="text-md font-bold p-4 bg-[#f9f5f6]">Total: £{{ total.toFixed(2) }}</span>
        </div>

        <div class="flex justify-end items-center pt-5">
          <!-- Checkout Button or Empty Cart Message -->
          <div>
            <a 
              v-if="isCheckoutEnabled" 
              @click="handleCheckout" 
              class="bg-[#8a2432] cursor-pointer border border-[#8a2432] text-white xl:py-3 lg:py-3 md:py-3 sm:py-3 py-2 xl:px-6 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">
              Checkout
            </a>
            <p v-else class="mt-4 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">
              Your Cart Is Empty.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [], // Holds the cart items
      orderStatus: '', // Holds the order status
      isCheckoutEnabled: false, // Flag to enable/disable checkout button
      orderNumber: '', // Holds the order number for the user
    };
  },
  computed: {
    // Calculate the total cost of the cart
    total() {
      return this.cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    }
  },
  methods: {
    // Fetch data from the API
    fetchCartData() {
      const user = JSON.parse(sessionStorage.getItem('user')); // Assuming `user` is stored as a JSON string in sessionStorage

      if (user && user.id) {
        const token = sessionStorage.getItem('token'); // Get the logged-in user's token

        if (token) {
          axios.get(`https://awa.gprlive.com/api/carts?user_id=${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
              this.cartItems = response.data.data.map(item => ({
                ...item,
                quantity: 1,
              }));
              this.orderStatus = this.cartItems[0].order_status;
              this.orderNumber = this.cartItems[0].order_number;

              // Enable checkout only if the order status is either 'In-Cart' or 'Draft'
              this.isCheckoutEnabled = (this.orderStatus === 'In-Cart' || this.orderStatus === 'Draft');
            }
          })
          .catch(error => {
            console.error('Error fetching cart data:', error);
          });
        }
      }
    },

    // Update the order status and proceed to checkout
    handleCheckout() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');

  if (user && user.id && token && this.orderNumber) {
    // Construct query parameters for each item in the cart
    const cartQueryParams = this.cartItems.map(item => {
      return `id=${item.id}&product_name=${encodeURIComponent(item.product_name)}&price=${encodeURIComponent(item.price)}&product_image=${encodeURIComponent(item.product_image)}`;
    }).join('&');

    // Make the POST request to update the order status to "In-Checkout"
    axios.post('https://awa.gprlive.com/api/update-order-status', {
      user_id: user.id,
      order_number: this.orderNumber,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data); // You can inspect the response here

      // After the order status is updated, redirect to the checkout page
      window.location.href = `/checkout?total=${this.total.toFixed(2)}&${cartQueryParams}`;
    })
    .catch(error => {
      console.error('Error updating order status:', error);
    });
  }
}

  },
  mounted() {
    this.fetchCartData(); // Fetch cart data when the component is mounted
  }
};
</script>
