import defaultAva from "../../../assets/img/avatar.png";

const userLogonState = {
    user: {
        _id: "",
        email: "",
        displayName: "",
        avatar: defaultAva,
    },
    isLoggedIn: false,
}

const userLogonReducer = (state = userLogonState, action) => {
    switch (action.type) {
        case "USER_LOGIN_SUCCESS":
            state.user._id = action.payload._id;
            state.user.email = action.payload.email;
            state.user.displayName = action.payload.displayName;
            state.user.avatar = action.payload.avatar;
            state.loading = false;
            state.isLoggedIn = true;
            return { ...state };
        default:
            return { ...state };
    }
}

export default userLogonReducer;