import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";

const Alert = (props) => {
    const { type, message } = props;
    const typeList = [
        "success",
        "warning",
        "danger",
        "info",
        "default",
        "primary",
    ];
    let alertType = type && typeList.includes(type) ? type : "default";
    alertType = `alert-${alertType.toLowerCase()}`;
    let alertMessage = message ?? "";

    return (
        <div className={`flex items-center text-md justify-start ${alertType}`}>
            <div className="w-1/12">
                <ExclamationIcon className="h-5 w-5 mr-2" />
            </div>
            <div className="w-11/12">{alertMessage}</div>
        </div>
    );
};

export default Alert;
