import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
    private users = [
        {
            "id":1,
            "name": "Leanne Graham",
            "email": "Sincere@INTERN.biz",
            "role": "INTERN",
        },
        {
            "id":2,
            "name": "Leanne Graham",
            "email": "Sincere@INTERN.biz",
            "role": "INTERN",
        },
        {
            "id":3,
            "name": "Leanne Graham",
            "email": "Sincere@ENGINEER.biz",
            "role": "ENGINEER",
        },
        {
            "id":4,
            "name": "Leanne Graham",
            "email": "Sincere@ENGINEER.biz",
            "role": "ENGINEER",
        },
        {
            "id":5,
            "name": "Leanne Graham",
            "email": "Sincere@ADMIN.biz",
            "role": "ADMIN",
        },
    ];

    findAll(role?:"INTERN" | "ENGINEER" | "ADMIN"){
        if(role){
            const rolesArray = this.users.filter(user => user.role==role)
            if(!rolesArray.length) throw new NotFoundException("User Role Not Found")
            return rolesArray;
        }

        return this.users
    }
    findOne(id:number){
        const user = this.users.find(user => user.id==id)

        if(!user) throw new NotFoundException("User not found");

        return user;
    }

    create(user: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id:number, updatedUser: UpdateUserDto){
        this.users = this.users.map(user=> {
            if(user.id === id) {
                return {...user, ...updatedUser};
            }
            return user;
        })

        return this.findOne(id);
    }

    delete(id: number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id!=id);

        return removedUser;
    }
    
}
