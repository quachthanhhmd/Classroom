/**
 *
 * @param password
 * @returns {<Promise>String}
 */
export declare const initPasswordHash: (password: string) => string;
/**
 *
 * @param passwordDB
 * @param passwordInput
 * @returns {<Promise>Boolean}
 */
export declare const comparePasswordHash: (passwordDB: string, passwordInput: string) => boolean;
