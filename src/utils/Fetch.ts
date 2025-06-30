/* eslint-disable @typescript-eslint/no-explicit-any */
const base = process.env.API_URL;
interface API_METHOD {
  url: string;
  params?: any;
  headers?: object;
}
async function request(
  url: string,
  params?: any,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  headers?: object
) {
  const options: { [k: string]: string | number | object } = {
    method,
    credentials: "include",
  };
  if (params) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = params;
    }
  }
  if (headers) {
    options.headers = headers;
  }
  const response = await fetch(base + url, options);
  const result = await response.json();
  if (response.ok) {
    return { status: "success", result };
  } else {
    return { status: "error", result: result.message };
  }
}

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}
function get({ url, params }: API_METHOD) {
  return request(url, params);
}

function post({ url, params, headers }: API_METHOD) {
  return request(url, params, "POST", headers);
}

function put({ url, params, headers }: API_METHOD) {
  return request(url, params, "PUT", headers);
}

function remove({ url, params, headers }: API_METHOD) {
  return request(url, params, "DELETE", headers);
}
const Fetch = {
  get,
  post,
  put,
  remove,
};
export default Fetch;
