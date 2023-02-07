import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../../utils/axios";
import { IUserInfo } from "../../types";
export const loadUserInfo = createAsyncThunk<IUserInfo, string>('userInfo/loadUserInfo', async (token) => {
    const userInfo = (await getUserInfo(token)).data;
    return userInfo;
});

interface IInitial {
    status: string;
    info: IUserInfo;
    error: string;
}

const initial: IInitial = {
    status: '',
    info: {
        avatarUrl: '',
        name: '',
        sex: '',
        address: '',
        birthday: '',
        aboutMe: ''
    },
    error: ""
}
export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: initial,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.info = action.payload;
        },
        removeUserInfo: (state, action: PayloadAction<undefined>) => {
            state.info = initial.info;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadUserInfo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.info = action.payload || initial.info;
                console.log(state.info)
                state.error = "";
            })
            .addCase(loadUserInfo.rejected, (state, action) => {
                state.status = 'falied';
                const { message } = action.error;
                state.error = message ? message : "";
            })
    }
});
export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;