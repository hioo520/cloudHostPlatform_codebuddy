import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardStats {
  totalHosts: number
  publicPoolHosts: number
  windowsHosts: number
  linuxHosts: number
  onlineHosts: number
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  abnormalHosts: number
}

interface DashboardState {
  stats: DashboardStats
  loading: boolean
}

const initialState: DashboardState = {
  stats: {
    totalHosts: 0,
    publicPoolHosts: 0,
    windowsHosts: 0,
    linuxHosts: 0,
    onlineHosts: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    abnormalHosts: 0,
  },
  loading: false,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setStats, setLoading } = dashboardSlice.actions
export default dashboardSlice.reducer