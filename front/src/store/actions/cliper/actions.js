import {Login, Record} from "./actionTypes";
//Login
export const changeLoginInput = (v) => ({
    type: Login.CHANGE_INPUT,
    value: v
})
export const changeDialogVisible = (v) => ({
    type: Login.CHANGE_DIALOG_VISIBLE,
    value: v
})
export const changeRegistered = (v) => ({
    type: Login.CHANGE_REGISTERED,
    value: v
})
export const finishLogin = (v) => ({
    type: Login.FINISH_LOGIN,
    value: v
})
export const clearLoginInput = ()=>({
    type: Login.CLEAR_INPUT
})
export const setLogin = (v)=>({
    type: Login.SET_LOGIN,
    value: v
})
export const logout = ()=>({
    type: Login.LOGOUT,
})
//TextRecordContainer
export const addTextRecords = (v)=>({
    type: Record.Text.ADD_RECORDS,
    value: v
})
export const clearTextRecords = ()=>({
    type: Record.Text.CLEAR_RECORDS
})
export const changeRecordInput = (v)=>({
    type: Record.CHANGE_INPUT,
    value: v
})
export const clearRecordInput = ()=>({
    type: Record.CLEAR_INPUT
})
