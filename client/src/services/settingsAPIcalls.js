const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function getSettings(username) {
  const response = await fetch(`${API_URL}/settings/${username}`, {
    method: 'GET',
  });
  return response.json();
}

export async function updateSetting(username) {
  const {
    filterBy,
    sortOrder,
    usageSpeed,
    highlightSelected,
    pinned,
    selected,
  } = updates;
  const response = await fetch(`${API_URL}/user/${username}`, {
    method: 'PATCH',
    body: JSON.stringify({
      filterBy,
      sortOrder,
      usageSpeed,
      highlightSelected,
      pinned,
      selected,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
