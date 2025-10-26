import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CloudHost {
  id: string
  provider: string
  region: string
  ip: string
  cpu: number
  memory: number
  disk: number
  bandwidth: number
  os: string
  onlineTime: string
  owner: string
  department: string
  sharedDepartment: string
  enableStatus: number
  managementStatus: number
  deviceStatus: number
}

interface CloudHostState {
  hosts: CloudHost[]
  loading: boolean
  searchParams: {
    ip?: string
    provider?: string
    region?: string
    status?: number
  }
}

const initialState: CloudHostState = {
  hosts: [],
  loading: false,
  searchParams: {},
}

const cloudHostSlice = createSlice({
  name: 'cloudHost',
  initialState,
  reducers: {
    setHosts: (state, action: PayloadAction<CloudHost[]>) => {
      state.hosts = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSearchParams: (state, action: PayloadAction<any>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    addHost: (state, action: PayloadAction<CloudHost>) => {
      state.hosts.unshift(action.payload)
    },
    updateHost: (state, action: PayloadAction<CloudHost>) => {
      const index = state.hosts.findIndex(host => host.id === action.payload.id)
      if (index !== -1) {
        state.hosts[index] = action.payload
      }
    },
    deleteHost: (state, action: PayloadAction<string>) => {
      state.hosts = state.hosts.filter(host => host.id !== action.payload)
    },
  },
})

export const {
  setHosts,
  setLoading,
  setSearchParams,
  addHost,
  updateHost,
  deleteHost,
} = cloudHostSlice.actions

export default cloudHostSlice.reducer