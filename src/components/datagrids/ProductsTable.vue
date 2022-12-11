//eslint-disable vue/this-in-template
<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <!-- {{ projects }} -->
    <b-table
      :checked-rows.sync="checkedRows"
      :paginated="paginated"
      :per-page="perPage"
      :data="products"
      default-sort="name"
      striped
      hoverable
    >
      <b-table-column
        v-slot="props"
        cell-class="has-no-head-mobile is-image-cell"
      >
        <div class="image">
          <img
            :src="props.row.image"
            class="is-rounded"
          >
        </div>
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="ID"
        field="id"
        sortable
      >
        {{ props.row.id }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Name"
        field="name"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>
      <!-- <b-table-column
        v-slot="props"
        label="Seller ID"
        field="user_id"
        sortable
      >
        {{ props.row.user_id }}
      </b-table-column> -->
      <!-- <b-table-column
        v-slot="props"
        label="Seller First Name"
        field="user.firstName"
        sortable
      >
        {{ props.row.user ? props.row.user.firstName : "-" }}
      </b-table-column> -->
      <b-table-column
        v-slot="props"
        label="Description"
        field="description"
        sortable
      >
        {{ props.row.description }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Quantity"
        field="quantity"
        sortable
      >
        {{ props.row.quantity }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Price"
        field="price"
        sortable
      >
        {{ props.row.price }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div
          v-if="userRole == 'Super-Admin' || userRole == 'Seller'"
          class="buttons is-right no-wrap"
        >
          <router-link
            :to="{name:'product.edit', params: {id: props.row.id}}"
            class="button is-small"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          .<b-button
            type=""
            size="is-small"
            @click="deleteItem(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>
        <div v-if="userRole == 'Buyer'">
          <router-link
            :to="{name:'order.new', params: {productId: props.row.id, sellerId: props.row.user_id, cost: props.row.price}}"
            class="button is-small"
          >
            ORDER
          </router-link>
        </div>
      </b-table-column>
      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import ModalBox from '@/components/BaseModalBox.vue'

export default defineComponent({
  name: 'TasksTable',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },

  computed: {
    paginated () {
      return this.$store.state.products.products.length > this.perPage
    },

    ...mapState({
      products: state => state.products.products
    })

  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      const role = this.$store.state.authentication.role
      const userId = this.$store.state.authentication.userId
      console.log(role, userId)
      if (role === 'Super-Admin' || role === 'Buyer') {
        this.$store.dispatch('products/getAllProducts')
      } else {
        this.$store.dispatch('products/getSellersProducts', userId)
      }
    },
    trashModalOpen (obj) {
      this.isModalActive = true
      this.trashObject = obj
      this.trashConfirm(obj.id)
    },
    trashConfirm (id) {
      console.log(id)
      this.$store.dispatch('products/deleteProduct', id)
      this.$buefy.snackbar.open({
        message: 'Deleted Project',
        queue: true
      })
      this.isModalActive = false
    },
    deleteItem (obj) {
      this.$store.dispatch('products/deleteProduct', obj.id)
      this.$buefy.snackbar.open({
        message: 'Deleted Project ' + obj.name,
        queue: true
      })
      this.getProducts()
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
})
</script>
