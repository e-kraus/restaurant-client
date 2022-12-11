<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
  >
    <div class="aside-tools">
      <a
        class="navbar-item is-hidden-touch is-hidden-widescreen is-desktop-icon-only"
        @click="asideToggleDesktopOnly"
      >
        <b-icon icon="menu" />
      </a>

      <!-- <div class="aside-tools-label">
        <span v-if="userRole == 'Admin'">Dashboard</span>
        <span v-if="userRole == 'Employee'">My Workspace</span>
      </div> -->
    </div>

    <div class="mt-2 mb-3 mr-3 ml-6">
      <img
        src="../../assets/logo.jpg"
        width="120"
        height="28"
      >
    </div>
    <div class="menu is-menu-main">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="">
          <!-- Home page -->
          <b-menu-item
            icon="desktop-mac"
            label="Dashboard"
            href="/dashboard"
          />
          <!-- Products -->
          <b-menu-list>
            <b-menu-item
              label="Menu"
              icon="square-edit-outline"
              href="/dashboard/products"
            />
          </b-menu-list>
          <!-- Orders -->
          <b-menu-list>
            <b-menu-item
              label="Orders"
              icon="account"
              href="/dashboard/orders"
            />
          </b-menu-list>
          <!-- Deliveries -->
          <b-menu-list>
            <b-menu-item
              v-if="userRole == 'Super-Admin' || userRole == 'Seller'"
              label="Deliveries"
              icon="link"
              href="/dashboard/deliveries"
            />
          </b-menu-list>
          <!-- Users -->
          <b-menu-list>
            <b-menu-item
              v-if="userRole == 'Super-Admin'"
              label="Users"
              icon="account-multiple"
              href="/dashboard/users"
            />
          </b-menu-list>
        </b-menu-list>
      </b-menu>
    </div>
  </aside>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'AsideMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      userRole: this.$store.state.authentication.role
    }
  },
  computed: {
    ...mapState({
      isAsideVisible: state => state.system.isAsideVisible
    })
  },
  methods: {
    asideToggleDesktopOnly () {
      this.$store.dispatch('system/asideDesktopOnlyToggle')
    },
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$buefy.snackbar.open({
        message: 'Logged Out!',
        queue: false
      })
    },
    menuClick (item) {
      //
    }
  }
})
</script>
