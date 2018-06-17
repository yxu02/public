class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, room, name){
    const user = {id, room, name};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    const user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user)=>{
        return user.id!==id;
      });
    }

    return user;
  }

  getUser(id){
    return this.users.filter((user)=>{
      return user.id === id;
    })[0];
  }

  getUserList(room){
    const list = this.users.filter((user)=>{
      return user.room === room;
    });

    return list.map((user)=>{
      return user.name;
    });
  }
}

module.exports = {Users};