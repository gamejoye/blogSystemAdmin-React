import { createSelector } from "@reduxjs/toolkit";
import { talksAdpater } from "../reducers/talksReducer";
import { IRootState } from "../store";
export const { selectAll: selectAllTalks } = talksAdpater.getSelectors((state: IRootState) => state.talks);
export const selectTalksStatus = (state: IRootState) => state.talks.status;