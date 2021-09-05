import MaterialTost from "materialize-css";
const SERVER_URL: string = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const signup = (payload: {
  name: string;
  password: string;
  email: string;
  picture: string;
}): any => {
  try {
    return fetch(`${SERVER_URL}/api/v1/user-accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data.success) {
          return data.data;
        } else {
          MaterialTost.toast({ html: data.errors });
          return null;
        }
      });
  } catch (err) {
    return null;
  }
};
