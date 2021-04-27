<template>
  <v-tabs
      v-model="tab"
      align-with-title
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
        v-for="item in tabs"
        :key="item"
    >
      {{ item }}
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card style="width: 90%;margin: auto;" flat>
          <v-card-text>


            <v-list three-line>
              <v-list-item-group
                  v-model="selected"
                  active-class="pink--text"
                  multiple
              >
              <template v-for="(item, index) in comments">
                <v-divider
                    v-if="item.divider"
                    :key="index"
                ></v-divider>

                <v-list-item
                    v-else
                    :key="item.title"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-row>
                      <v-col cols="12" class="itemAction">
                        <v-list-item-content>
                          <v-list-item-title v-html="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                          <v-textarea v-if="active" />
                        </v-list-item-content>
                      </v-col>
                      <v-col cols="12" class="itemAction">
                        <v-list-item-action>

                          <v-btn @click="openAnswerBox(active)" v-if="!item.answered" outlined color="#682AD5">پاسخ</v-btn>
                          <div v-else class="answeredStatus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-check" viewBox="0 0 16 16">
                              <path
                                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>
                            <p>
                              پاسخ داده شده
                            </p>
                          </div>
                        </v-list-item-action>
                      </v-col>
                    </v-row>


                  </template>

                </v-list-item>
              </template>
              </v-list-item-group>
            </v-list>


          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>test text2</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>test text3</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
export default {
  name: "CommentsList",
  data() {
    return {
      selected: [2],
      tab: null,
      comments: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          answered: false,
          title: 'هلیا محمدی',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          answered: false,
          title: 'هلیا محمدی',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          answered: true,
          title: 'هلیا محمدی',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          answered: true,
          title: 'هلیا محمدی',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        {divider: true, inset: true},
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          answered: false,
          title: 'هلیا محمدی',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
      ],
      tabs: [
        'همه', 'خوانده نشده', 'اخیر'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  methods: {
    openAnswerBox(t) {
      t= !t
    }
  }
}
</script>

<style>
.v-tab:before, .v-tabs-slider {
  background-color: #682AD5 !important;
}


</style>
<style scoped>
p {
  display: inline;
}

.answeredStatus {
  width: 120px;
  border-radius: 5px;
  background: #682AD5;
  color: white;
  height: 36px;
  padding: 5% 1%;
}

.itemAction {
  display: flex;
  flex-flow: row-reverse;
}
</style>