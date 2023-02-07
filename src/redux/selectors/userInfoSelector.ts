import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../store";

export const selectUserInfo = (state: IRootState) => state.userInfo.info;
export const selectName = createSelector(
    [(state: IRootState) => state.userInfo.info],
    (info) => info.name
)
export const selectAboutMe = createSelector(
    [(state: IRootState) => state.userInfo.info],
    (info) => info.aboutMe
)