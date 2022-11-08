export const HEADERS_DEFAULT = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

export const getAuthHeader = (accessToken: any) => ({
    Authorization: `JWT ${accessToken}`,
  });