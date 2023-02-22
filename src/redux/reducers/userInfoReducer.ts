import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo, postUserImage, putUserInfo } from "../../utils/axios";
import { IUserInfo } from "../../types";
export const loadUserInfo = createAsyncThunk<IUserInfo, string>('userInfo/loadUserInfo', async (token) => {
    const userInfo = (await getUserInfo(token)).data;
    return userInfo;
});
export const uploadUserImage = createAsyncThunk<string, FormData>('userInfo/uploadUserImage', async (formData) => {
    const imageUrl = (await postUserImage(formData)).data;
    return imageUrl;
})
export const updateUserInfo = createAsyncThunk<IUserInfo | null, IUserInfo>('userInfo/updateUserInfo', async (userInfo) => {
    const ok = (await putUserInfo(userInfo)).data;
    if (ok) return userInfo;
    return null;
})

interface IInitial {
    status: string;
    avatarUrlStatus: string;
    info: IUserInfo;
    error: string;
}

const initial: IInitial = {
    status: 'idle',
    avatarUrlStatus: 'idle',
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
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload) state.info = payload;
            })
            .addCase(uploadUserImage.pending, (state, action) => {
                state.avatarUrlStatus = 'loading';
            })
            .addCase(uploadUserImage.fulfilled, (state, action) => {
                const { payload } = action;
                state.avatarUrlStatus = 'succeeded';
                state.info.avatarUrl = payload;
            })
            .addCase(uploadUserImage.rejected, (state, action) => {
                state.info.avatarUrl = "";
                state.avatarUrlStatus = 'failed';
                const { message } = action.error;
                state.error = message ?? "";
            })
    }
});
export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;