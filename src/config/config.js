const { REACT_APP_API_BASE_URL } = process.env

// SHORTEN KEYS
const BASE_URL = REACT_APP_API_BASE_URL

export const config = {
    api: {
        createTrainer: BASE_URL + '/admin/trainer/create',
        fetchAllTrainers: BASE_URL + '/admin/trainers/all',
        fetchTrainers: BASE_URL + '/admin/trainers',
        sendTrainerInvite: BASE_URL + '/admin/trainer/send-invite',
        verifyOtp: BASE_URL + '/admin/verify-otp',
        register: BASE_URL + '/admin/register',
        login: BASE_URL + '/admin/login',
        verifyEmail: BASE_URL + '/admin/email/verify',
        createCategory: BASE_URL + '/admin/category/create',
        getCategory: BASE_URL + '/admin/category',
        getAllCategory: BASE_URL + '/admin/category/all',
        addUserToCategory: BASE_URL + '/admin/category/add',
        viewTrainer: BASE_URL + '/admin/trainer/',
        createClass: BASE_URL + '/admin/classes',
        fetchClasses: BASE_URL + '/admin/classes',
        fetchAllClasses: BASE_URL + '/admin/classes/all',
        deleteClass: BASE_URL + '/admin/classes',
        updateClass: BASE_URL + '/classes',
        updateClassStatus: BASE_URL + '/admin/classes',
        getAssignedClasses: BASE_URL + '/trainer/classes',
        unassignClassesToTrainer: BASE_URL + '/trainer/classes',
        getAttendance: BASE_URL + '/trainer/attendance',
    },
}
