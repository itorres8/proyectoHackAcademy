const apiUrl = import.meta.env.VITE_API_URL;

export const register = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
  } catch (error) {}
};

export const login = async (dataLogin) => {
  try {
    const response = await fetch(`${apiUrl}/tokens`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const getUser = async (id, token) => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
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
    const response = await fetch(`${apiUrl}/orders`, {
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
    phone: formData.phone,
    address: formData.address,
    password: formData.password,
  };

  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userUpdate),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const getPrice = async () => {
  try {
    const response = await fetch(`${apiUrl}/prices`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (err) {
    return null;
  }
};

export const getPriceById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/prices/${id}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (err) {
    return null;
  }
};

export const deleteUser = async (id, token) => {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};
