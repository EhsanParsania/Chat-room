const init = { id: 'AWRo1wrsoIY4dTCVAAAB', username: 'parsaaa', room: 'room 5' }
const users = [init];

// joins the user to the specific chatroom
const join_User = (id, username, room) => {
  const p_user = { id, username, room };
  users.push(p_user);
  console.log(users, "users");
  return p_user;
}

console.log("user out", users);

// Gets a particular user id to return the current user
const get_Current_User = (id) => {
  return users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
const user_Disconnect = (id) => {
  const index = users.findIndex((p_user) => p_user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
};