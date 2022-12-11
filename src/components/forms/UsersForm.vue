<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroTitle }}
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field
              label="ID"
              horizontal
            >
              <b-input
                v-model="form.id"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <hr>
            <hr>
            <b-field
              label="First Name"
              message="First name"
              horizontal
            >
              <b-input
                v-model="form.firstName"
                placeholder="e.g. John"
                required
              />
            </b-field>
            <b-field
              label="Last name"
              message="Last name"
              horizontal
            >
              <b-input
                v-model="form.lastName"
                placeholder="e.g. Doe"
                required
              />
            </b-field>
            <b-field
              label="Email"
              message="Company email"
              horizontal
            >
              <b-input
                v-model="form.email"
                placeholder="e.g. johndoe@lotus.com"
                required
              />
            </b-field>
            <b-field
              label="Password"
              message="Confidential Password"
              horizontal
            >
              <b-input
                v-model="form.password"
                placeholder="e.g. K!22@ark_cd"
                required
                type="password"
              />
            </b-field>
            <b-field
              label="Role"
              message="User's role"
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.role"
                  placeholder="Select a role"
                >
                  <option value="Super-Admin">
                    Super-Admin
                  </option>
                  <option value="Seller">
                    Seller
                  </option>
                  <option value="Buyer">
                    Buyer
                  </option>
                </b-select>
              </div>
            </b-field>
            <b-field
              label="Phone Number"
              message="Phone Number"
              horizontal
            >
              <b-input
                v-model="form.phoneNumber"
                placeholder="2547******"
                required
              />
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button
                type="is-info"
                :loading="isLoading"
                native-type="submit"
              >
                Submit
              </b-button>
              <b-button
                type=""
                :loading="isLoading"
                @click="$router.push('/dashboard/users')"
              >
                Back
              </b-button>
            </b-field>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'UsersForm',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isProfileExists: false,
      isLoading: false,
      form: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Users',
        this.isProfileExists ? this.form.firstName + ' ' + this.form.lastName : 'New User'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create User'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'user.new' } : { name: 'Users' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New User' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit User' : 'Create User'
    },
    ...mapState({
      users: state => state.users.users
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.email = ''
        this.form.password = ''
        this.form.role = ''
        this.form.phoneNumber = ''
        this.createdReadable = new Date().toLocaleDateString()
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.users.find((user) => user.id === this.$route.params.id)

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.firstName = item.firstName
          this.form.lastName = item.lastName
          this.form.email = item.email
          this.form.role = item.role
          this.form.phoneNumber = item.phoneNumber

          this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        }
      } else {
        this.$router.push({ name: 'user.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      // const password = 'password'
      // const saltRounds = 2
      // const hashedPassword = bcrypt.hash(password, saltRounds)
      const newUser = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        role: this.form.role,
        phoneNumber: this.form.phoneNumber,
        password: this.form.password
      }
      const updateUser = {
        userId: this.$route.params.id,
        user: this.form
      }
      if (this.$route.params.id) {
        this.$store.dispatch('users/updateUser', updateUser)
        this.$buefy.snackbar.open({
          message: 'Successfully updated the User',
          queue: true
        })
      } else {
        this.$store.dispatch('users/createUser', newUser)
        this.$buefy.snackbar.open({
          message: 'Successfully created the User',
          queue: true
        })
      }
    }
  }
})
</script>
