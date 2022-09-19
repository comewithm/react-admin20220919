import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface LayoutState {
    auth: {
        permissions: any
    },
    responsive: {
        isMobile: boolean
    },
    light: boolean
}

const initialState: LayoutState = {
    auth:{permissions: null},
    responsive: {isMobile: false},
    light: true
}

export const layoutSlice = createSlice({
    name:'layout',
    initialState,
    reducers: {
        updateLayout: (state, action: PayloadAction<LayoutState>) => {
            state = {
                ...state,
                ...action
            }
        }
        
    }
})

export const { updateLayout } = layoutSlice.actions

export default layoutSlice.reducer