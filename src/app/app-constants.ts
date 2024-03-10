export const baseUrl = 'http://localhost:8000';

export const API_ENDPOINTS = {
    account: {
        login: '/api/user/login',
        register: '/api/user/register',
        forgotPassword: '/api/forgot-password',
        logout: '/api/user/logout'
    },
    profile: {
        getAllProfiles: '/profile/getAll',
        addProfile: '/profile/addProfile',
        getProfilebyId:'/profile/'
    },
    roles: {
        getRoles: '/roles/',
        

    },
    user: {
        getAllUsers: '/api/user/getAll',
        getUser: '/api/user',
        updateUser: '/api/user/update',
        updatRole: '/api/user/updateRole'
    },
    applications: {
        getAllApplications: '/applicationDetailsAPI'
    }

}
export const RESPONSE_STATUS = {
    badRequest: 'BAD_REQUEST'
}
export const adminSideMenuData = [
    { name: 'home', label: 'Home', icon: 'bi bi-house', active: true },
    { name: 'employee', label: 'Employees', icon: 'bi bi-people-fill', active: false },
    { name: 'application', label: 'Applications ', icon: 'bi bi-grid', active: false },
    { name: 'profile', label: 'Profiles ', icon: 'bi bi-person-lines-fill', active: false },
    { name: 'role', label: 'Roles ', icon: 'bi bi-person-fill-gear', active: false }
    ,
    { name: 'userProfiles', label: 'UserProfiles ', icon: 'bi bi-person-plus-fill', active: false }
];
export const userSideMenuData = [
    { name: 'application', label: 'Applications ', icon: 'bi bi-grid', active: false },
];
export const employeeDataColumns = [
    { name: 'userId', label: 'Id', colType: 'text', width: '2%' },
    { name: 'username', label: 'Employee Name', colType: 'text', width: '5%' },
    { name: 'email', label: 'Email', colType: 'text', width: '5%' },
    { name: 'profileId', navigate: 'profile.profileId', label: 'Profile Id', colType: 'text', width: '2%' },
    { name: 'action', label: 'Action', colType: 'action', width: '5%', actionList: [{ label: 'Edit', name: 'edit', btnType: 'primary' }, { label: 'Delete', name: 'delete', btnType: 'danger' }] }
];
export const profileDataColumns = [
    { name: 'profileId', label: 'Profile Id', colType: 'text', width: '5%' },
    { name: 'profileName', label: 'Profile name', colType: 'text', width: '5%' },
    { name: 'profileDescription', label: 'Profile Description', colType: 'text', width: '5%' },
    { name: 'roles', label: 'Roles', colType: 'text', width: '1%' },

    { name: 'action', label: 'Action', colType: 'action', width: '5%', actionList: [{ label: 'Edit', name: 'edit', btnType: 'primary' }, { label: 'Delete', name: 'delete', btnType: 'danger' }] }

];
export const profileDataColumnsEmployeeSide = [
    { name: 'profileId', label: 'Profile Id', colType: 'text', width: '3%' },
    { name: 'profileName', label: 'Profile name', colType: 'text', width: '3%' },
    { name: 'profileDescription', label: 'Profile Description', colType: 'text', width: '5%' },
    { name: 'roles', label: 'Roles', colType: 'text', width: '1%' },
    { name: 'action', label: 'Action', colType: 'action', width: '5%', actionList: [{ name: 'assign', label: 'Assign', btnType: 'primary' }] }

];
export const roleDataColumns = [
    { name: 'roleId', label: 'Role Id', colType: 'text', width: '5%' },
    { name: 'roleName', label: 'Role name', colType: 'text', width: '5%' },
    { name: 'roleDescription', label: 'Role Description', colType: 'text', width: '5%' },
    { name: 'action', label: 'Action', colType: 'action', width: '5%', actionList: [{ label: 'Edit', name: 'edit', btnType: 'primary' }, { label: 'Delete', name: 'delete', btnType: 'danger' }] }

];
export const roleDataColumnsEmployeeSide = [
    { name: 'roleId', label: 'Role Id', colType: 'text', width: '5%' },
    { name: 'roleName', label: 'Role name', colType: 'text', width: '5%' },
    { name: 'roleDescription', label: 'Role Description', colType: 'text', width: '5%' },

];
export const roles = {
    AdminRole: 'ROLE_ADMIN',
    userRole: 'ROLE_USER'
}

