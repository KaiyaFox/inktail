import react from 'react';

/**
 * This context provider is used to store and pass down user data to the components that request it.
 */
const UserDataContext = react.createContext(null);

export default UserDataContext;