const url = "https://ha-videoclub-api-g1.vercel.app";

export const register = async (user) => {
  try {
    const response = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (dataLogin) => {
  try {
    console.log(dataLogin);
    const response = await fetch(`${url}/tokens`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
