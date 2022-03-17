const { REACT_APP_API_BASE_URL } = process.env

// SHORTEN KEYS
const BASE_URL = REACT_APP_API_BASE_URL

export const config = {
    api: {
        createTrainer: BASE_URL + '/admin/trainer/create',
        fetchTrainers: BASE_URL + '/admin/trainers',
        sendTrainerInvite: BASE_URL + '/admin/trainer/send-invite',
        verifyOtp: BASE_URL + '/admin/verify-otp',
        register: BASE_URL + '/admin/login',
        login: BASE_URL + '/admin/login',
    },
}
