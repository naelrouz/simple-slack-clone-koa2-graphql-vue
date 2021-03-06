import decode from 'jwt-decode';
import gql from 'graphql-tag';

import apolloClient from '../../api/apollo/apollo-client';
import { me } from '../../api/';

const state = {
  me: {},
  allUsersList: []
  // token: localStorage.getItem('token'),
  // refreshToken: localStorage.getItem('refreshToken')
};

const getters = {
  me: ({ me }) => me,
  userId: () => {
    try {
      const { user } = decode(localStorage.getItem('token'));
      // eslint-disable-next-line prefer-destructuring
      return user.id;
    } catch (err) {
      return false;
    }
  },
  username: () => {
    try {
      const { user: { username } } = decode(localStorage.getItem('token'));
      // eslint-disable-next-line prefer-destructuring
      return username;
    } catch (err) {
      return false;
    }
  },
  allUsersList: ({ allUsersList }) => allUsersList,
  // v1
  // token: ({ token }) => token,
  // refreshToken: ({ refreshToken }) => refreshToken,
  // getTokens: ({ token, refreshToken }) => ({ token, refreshToken })
  // v2
  token: () => localStorage.getItem('token'),
  refreshToken: () => localStorage.getItem('refreshToken'),
  getTokens: () => ({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken')
  })
};

const mutations = {
  SET_USERS_LIST(state, allUsersList) {
    state.allUsersList = allUsersList;
  },
  SET_TOKEN(state, token) {
    // state.token = token;
    localStorage.setItem('token', token);
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    // state.refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
  },
  SET_ME(state, me) {
    state.me = me;
  }
};
const actions = {
  allUsers({ commit }) {
    apolloClient
      .query({
        query: gql`
          {
            allUsers {
              id
              username
              email
            }
          }
        `
      })
      .then(({ data: { allUsers } }) => {
        // const {  } = data;
        // console.log('actions.allUsers.result', allUsers);
        commit('SET_USERS_LIST', allUsers);
      });
  },
  me() {
    // console.log('>>>>>>>> actions.me');
    return me();
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
