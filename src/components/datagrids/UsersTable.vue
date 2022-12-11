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
      :data="users"
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
        label="First Name"
        field="firstName"
        sortable
      >
        {{ props.row.firstName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Last Name"
        field="lastName"
        sortable
      >
        {{ props.row.lastName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Email"
        field="email"
        sortable
      >
        {{ props.row.email }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Phone Number"
        field="phoneNumber"
        maxlength="10"
        minlength="7"
        sortable
      >
        {{ props.row.phoneNumber }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Role"
        field="role"
        sortable
      >
        {{ props.row.role }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div
          v-if="userRole == 'Super-Admin'"
          class="buttons is-right no-wrap"
        >
          <router-link
            :to="{name:'user.edit', params: {id: props.row.id}}"
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
  name: 'UsersTable',
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
      return this.$store.state.users.users.length > this.perPage
    },

    ...mapState({
      users: state => state.users.users
    })

  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$store.dispatch('users/getAllUsers')
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
      this.$store.dispatch('users/deleteDelivery', obj.id)
      this.$buefy.snackbar.open({
        message: 'Deleted user ' + obj.firstName,
        queue: true
      })
      this.$store.dispatch('users/getAllUsers')
      this.getUsers()
    }
  }
})
</script>
