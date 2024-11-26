<template>
  <div class="overlay" @click.self="handleOverlayClick">
    <div class="modal">
      <div class="flex flex-col md:flex-row">
        <!-- Product Image -->
        <div class="w-full md:w-1/3">
          <img 
            :src="product.image ? getImageUrl(product.image) : require('@/assets/Mark 1.jpg')" 
            alt="Product Image" 
            class="w-full h-full object-cover shadow-lg"
          />
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-2/3 p-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">{{ product.lot_title || 'No Title Available' }}</h2>
          
          <div class="text-sm text-gray-600 mb-2">
            <p><strong>Lot:</strong> <span class="font-medium">{{ product.lot_number }}</span></p>
            <p><strong>Reserve Price:</strong> <span class="font-medium">{{ product.reserve_price }}</span></p>
            <p><strong>Current Bid:</strong> <span class="font-medium">{{ product.current_bid }}</span></p>
          </div>

          <!-- Bid Amount Input -->
          <div class="mt-4">
            <label for="bidAmount" class="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Bid Amount
            </label>
            <input
              id="bidAmount"
              v-model="bidAmount"
              type="number"
              placeholder="Enter amount"
              class="mt-1 block w-full border-gray-300 shadow-sm focus:ring-[#8a2432] focus:border-[#8a2432] sm:text-sm"
              :min="product.current_bid + 1"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end mt-6 gap-4">
            <button
              class="px-4 py-2 bg-gray-300 text-black hover:bg-gray-400 focus:ring focus:ring-gray-500"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-[#8a2432] text-white hover:bg-[#701d29] focus:ring focus:ring-[#8a2432]"
              @click="submitBid"
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the baseURL from the centralized axios.js file
import { baseURL } from '@/axios';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bidAmount: '', // Holds the user's bid input
    };
  },
  methods: {
    // Method to generate the correct image URL by removing '/api' from the base URL
    getImageUrl(imagePath) {
      // Ensure the imagePath is concatenated correctly with baseURL
      return imagePath ? `${baseURL.replace('/api', '')}${imagePath.replace(/^\//, '')}` : '';
    },
    cancel() {
      // Emit 'close' to parent and reset input
      this.bidAmount = '';
      this.$emit('close');
    },
    submitBid() {
      if (!this.bidAmount || this.bidAmount <= this.product.current_bid) {
        alert(`Please enter a bid higher than the current bid of ${this.product.current_bid}.`);
        return;
      }

      // Simulate bid submission logic (Replace with real API calls if needed)
      console.log(`Bid placed: ${this.bidAmount} on Lot ${this.product.lot_number}`);

      // Reset input and close the modal
      this.bidAmount = '';
      this.$emit('close');
    },
    handleOverlayClick() {
      // Closes the modal if clicking outside the modal content
      this.cancel();
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 1.5rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modal input {
  padding: 8px;
}

button {
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

button:focus {
  outline: none;
}

.cancel-button {
  background-color: #ccc;
  color: black;
  border: 1px solid #aaa;
}

.bid-button {
  background-color: #8a2432;
  color: white;
  border: 1px solid #8a2432;
}

.bid-button:hover {
  background-color: #701d29;
}

.cancel-button:hover {
  background-color: #bbb;
}
</style>
