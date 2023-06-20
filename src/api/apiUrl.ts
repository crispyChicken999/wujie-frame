// Note: This file is used to store all the api urls of the project
// const subAppApiUrl = "http://sub-app-api-url.com";
// const projectApiUrl = "http://project-api-url.com";

// export const apiURL: Object = {
//   subApp: {
//     baseURL: subAppApiUrl,
//     login: `${subAppApiUrl}/login`,
//     refreshToken: `${subAppApiUrl}/refreshToken`
//   },
//   mainApp: {
//     // add your project api urls here
//     baseURL: projectApiUrl
//   }
// };

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = "http://192.168.31.130:8088/api/";
} else {
  baseURL = "http://www.goomaker.com";
}
export { baseURL };
