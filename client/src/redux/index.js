import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: {},
    posts: [],
    userCount:null,
  
  };

const appSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setLogin: (state, action) => {
        state.user = {...action.payload};
      },
      setPost : (state,action)=>{
        state.posts = action.payload
      },
      setUserCount : (state,action)=>{
        state.userCount = action.payload
      }
  },
});

export const { setLogin, setPost ,setUserCount} = appSlice.actions;

export default appSlice.reducer;
