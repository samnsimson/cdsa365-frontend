const { REACT_APP_API_BASE_URL } = process.env

// SHORTEN KEYS
const BASE_URL = REACT_APP_API_BASE_URL

export const config = {
    api: {
        createTrainer: BASE_URL + '/admin/trainer/create',
        fetchTrainers: BASE_URL + '/admin/trainers',
        sendTrainerInvite: BASE_URL + '/admin/trainer/send-invite',
        verifyOtp: BASE_URL + '/admin/verify-otp',
        register: BASE_URL + '/admin/register',
        login: BASE_URL + '/admin/login',
        verifyEmail: BASE_URL + '/admin/email/verify',
        createCategory: BASE_URL + '/admin/category/create',
        getCategory: BASE_URL + '/admin/category',
        addUserToCategory: BASE_URL + '/admin/category/add',
    },
}
