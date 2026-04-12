import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
  user_type: string;
  age: number;
  phone: string;
  address: string;
  next_check?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private authSer:Auth,private _http:HttpClient){}
  apiUrl = 'http://127.0.0.1:3000/user';
  // get all users
  get_all_user() : Observable<IUser[]>{
    const access_token :string|null = this.authSer.getToken();
    return this._http.get<IUser[]>(`${this.apiUrl}/get_all_users`,{
      headers:{
        Authorization:`Bearer ${access_token}`
      }
    })
  }
  // delete user by id
  delete_user(id:number):Observable<string>{
    const access_token :string|null = this.authSer.getToken();
    return this._http.delete<string>(`${this.apiUrl}/remove_user/${id}`,{
      headers:{
        Authorization:`Bearer ${access_token}`
      }
    })
  }
  // create doctor
  create_doctor(formData:FormData):Observable<string>{
    const access_token :string|null = this.authSer.getToken();
    return this._http.post<string>(`${this.apiUrl}/create_doctor`,formData,{
      headers:{
        Authorization:`Bearer ${access_token}`
      }
    })
  }
}
