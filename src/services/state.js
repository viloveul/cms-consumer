import initial from '@/common/initial'

const initialState = {
  ...JSON.parse(JSON.stringify(initial))
}

export default {
  ...initialState
}
