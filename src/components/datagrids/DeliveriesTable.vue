<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <!-- :checkable="checkable" -->
    <b-table
      :checked-rows.sync="checkedRows"
      :paginated="paginated"
      :per-page="perPage"
      :data="deliveries"
      default-sort="name"
      striped
      hoverable
    >
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
        label="Order ID"
        field="order_id"
        sortable
      >
        {{ props.row.order_id }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="User "
        field="user_id"
        sortable
      >
        {{ props.row.user ? "[" + props.row.user.id + "] " + props.row.user.firstName : props.row.product_id }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Payment Status"
        field="payment_status"
        sortable
      >
        {{ props.row.payment_status > 0 ? " Paid" : "Not Paid" }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Dispatch Status"
        field="dispatch_status"
        sortable
      >
        {{ props.row.dispatch_status > 0 ? " Dispatched" : "Not Dispatched" }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Delivery Status"
        field="delivery_status"
        sortable
      >
        {{ props.row.delivery_status > 0 ? " Delivered" : "Not Delivered" }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div
          class="buttons is-right no-wrap"
        >
          <router-link
            :to="{ name: 'deliveries.edit', params: { id: props.row.id } }"
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
  name: 'DeliveriesTable',
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
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },

  computed: {
    paginated () {
      return this.$store.state.deliveries.deliveries.length > this.perPage
    },

    ...mapState({
      deliveries: state => state.deliveries.deliveries
    })

  },
  created () {
    this.getDeliveries()
  },
  methods: {
    getDeliveries () {
      const role = this.$store.state.authentication.role
      const userId = this.$store.state.authentication.userId
      if (role === 'Super-Admin') {
        this.$store.dispatch('deliveries/getAllDeliveries')
      } else {
        this.$store.dispatch('deliveries/getSellersDeliveries', userId)
      }
    },
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false

      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    deleteItem (obj) {
      this.$store.dispatch('deliveries/deleteDelivery', obj.id)
      this.$buefy.snackbar.open({
        message: 'Deleted Deliveries ' + obj.firstName,
        queue: true
      })
      this.$store.dispatch('deliveries/getAllDeliveries')
      this.getDeliveries()
    }
  }
})
</script>
