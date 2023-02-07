import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit"
import { getAllTalks, deleteTalk, postTalk } from "../../utils/axios"
import { ITalk } from "../../types"

export const loadTalks = createAsyncThunk<ITalk[], string>('talks/loadTalks', async (name) => {
    const talks = (await getAllTalks(name)).data;
    return talks;
});
export const removeTalk = createAsyncThunk<ITalk | null, ITalk>('talks/deleteTalk', async (talk) => {
    const ok = (await deleteTalk(talk)).data;
    if (ok) return talk;
    return null;
})
export const addTalk = createAsyncThunk<ITalk, ITalk>('talks/addTalk', async (talk) => {
    const ok = (await postTalk(talk)).data;
    return ok;
})
export const talksAdpater = createEntityAdapter<ITalk>({
    sortComparer: (a, b) => b.releaseTime - a.releaseTime
});
const initialState = talksAdpater.getInitialState({
    status: 'idle',
    error: ""
});
export const talkSlice = createSlice({
    name: 'talks',
    initialState,
    reducers: {
        removeAllTalks: (state, action: PayloadAction<undefined>) => {
            talksAdpater.removeAll(state);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadTalks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadTalks.fulfilled, (state, action) => {
                const { payload } = action;
                state.status = 'succeeded';
                talksAdpater.addMany(state, payload);
            })
            .addCase(loadTalks.rejected, (state, action) => {
                state.status = 'falied';
                const { message } = action.error;
                state.error = message ? message : "";
            })
            .addCase(removeTalk.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload) {
                    talksAdpater.removeOne(state, payload.id);
                }
            })
            .addCase(addTalk.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload) {
                    talksAdpater.addOne(state, payload);
                }
            })
    }
});
export const { removeAllTalks } = talkSlice.actions;
export default talkSlice.reducer;