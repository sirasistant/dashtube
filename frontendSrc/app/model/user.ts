
export class User{
    _id:string;
    alias:string;
    password:string;
    email:string;
    name:string;
    profilePic:string;

    constructor(json:any){
        this.alias = json.alias;
        this.password = json.password;
        this.email = json.email;
        this.name = json.name;
        this._id = json._id;
        this.profilePic = json.profilePic;
    }

    fillFormData(data: FormData) {
        data.append("name", this.name);
        data.append("_id", this._id);
        data.append("profilePic", this.profilePic);
        data.append("alias", this.alias);
        data.append("password", this.password);
        data.append("email", this.email);
        return data;
    }

    toFormData() {
        return this.fillFormData(new FormData());
    }
}