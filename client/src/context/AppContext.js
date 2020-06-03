import React from "react";

// set the defaults
const UserContext = React.createContext({
    dbUser: "",
    setDbUser: () => {
    }
});

export default UserContext