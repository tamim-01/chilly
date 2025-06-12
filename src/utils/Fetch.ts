const base = process.env.API_URL;
interface API_METHOD {
  url: string;
  params?: Record<string, string | number>;
}
async function request(
  url: string,
  params?: Record<string, string | number>,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET"
) {
  const options: { [k: string]: string | number | object } = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  if (params) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }
  const response = await fetch(base + url, options);
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}

function objectToQueryString(obj: Record<string, string | number>) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}
function get({ url, params }: API_METHOD) {
  return request(url, params);
}

function post({ url, params }: API_METHOD) {
  return request(url, params, "POST");
}

function put({ url, params }: API_METHOD) {
  return request(url, params, "PUT");
}

function remove({ url, params }: API_METHOD) {
  return request(url, params, "DELETE");
}
const Fetch = {
  get,
  post,
  put,
  remove,
};
export default Fetch;
