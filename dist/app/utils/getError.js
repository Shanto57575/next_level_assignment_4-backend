"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
exports.default = getErrorMessage;
