import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        userDetails: {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            mobileNo: '',
        },
    },
    reducers: {
        setloggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },
})

export const { setloggedIn, setUserDetails } = userSlice.actions;

export default userSlice.reducer;