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

    const data = await response.json();
    console.log(data);
  } catch (error) {}
};

export const login = async (dataLogin) => {
  try {
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
    return null;
  }
};

export const getUser = async (id, token) => {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    return data;
  } catch (err) {
    return null;
  }
};

export const createOrder = async (movies, token) => {
  
  const order = {
    type: "movie",
    data: movies,
  };

  
  try {
    const response = await fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const editUser = async (id, token, formData) => {
  
  const userUpdate = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
  }

  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userUpdate),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
};