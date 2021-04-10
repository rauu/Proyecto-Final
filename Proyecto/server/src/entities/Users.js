class User{
     constructor(id_user, username, name, surname, role_user, email, sex, password, description, date_birth){
          this.id = id_user;
          this.username = username;
          this.name = name;
          this.surname = surname;
          this.role_user = role_user;
          this.email = email;
          this.sex = sex;
          this.password = password;
          this.description = description;
          this.date_birth = date_birth
     }

     getID(){
          return this.id;
     }
     setId(id){
          this.id = id;
     }

     getUsername(){
          return this.username;
     }
     setUsername(username){
          this.username = username;
     }

     getName(){
          return this.name;
     }
     setName(name){
          return this.name = name
     }

     getSurname(){
          return this.surname;
     }
     setSurname(surname){
          return this.surname = surname;
     }

     getRole_user(){
          return this.role_user;
     }
     setRole_User(role_user){
          return this.role_user = role_user;
     }

     getEmail(){
          return this.email;
     }
     setEmail(email){
          return this.email = email;
     }

     getSex(){
          return this.sex;
     }
     setSex(sex){
          return this.sex = sex;
     }

}

module.exports = User;