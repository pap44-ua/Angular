import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})

export class ClientApiService {
  API_URL = 'http://localhost:3000/items'
    constructor() {}

  async getItems(): Promise<Item[]>{
      var resp = await fetch(this.API_URL)
      if (resp.ok) {
          return resp.json()
      }
      else {
          throw new Error(resp.status.toString())
      }
  }

  async toggleItem(id: number, valor: boolean): Promise<boolean> {
      var resp = await fetch(`${this.API_URL}/${id}`,
                          {
                              method: 'PATCH',
                              headers: {
                                  'Content-Type':'application/json'
                              },
                              body: JSON.stringify({comprado: valor})
                          })
      if (resp.ok) {
          return true
      } 
      else {
          throw new Error(resp.status.toString())
      }                   
  }

  async addItem(nom: string): Promise<Item> {
      var datos = JSON.stringify({nombre:nom})
      var resp = await fetch(this.API_URL,{
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: datos
      })
      if (resp.ok) {
          return resp.json()
      } 
      else {
          throw new Error(resp.status.toString())
      } 
  }

  async delItem(id: number): Promise<boolean> {
      var resp = await fetch(this.API_URL+'/'+id,{
          method:'DELETE'
      })
      if (resp.ok) {
          return true
      }
      else {
          return false
      }
  }

  async editItem(id: number, nom: string, comp: boolean): Promise<boolean> {
        var datos = JSON.stringify({nombre:nom, comprado:comp})
        var resp = await fetch(this.API_URL+'/'+id,{
            method:'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: datos
        })
        if (resp.ok) {
            return true
        }
        else {
            return false
        }
    }
}
