import {connectDB} from '@/db/index.js';
import { User } from '@/models/user.model';
import {NextRequest, NextResponse} from 'next/server';



export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email, password, firstName, lastName, role, ...otherFields} = reqBody;
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({error:"User already exist", status:400});
        }

        const registerUser = await User.create({
            email,
            password,
            firstName,
            lastName,
            role,
            ...otherFields
        })

        return NextResponse.json({
            message:"Registration successfull",
            user:registerUser,
            status:201
        })
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({error:error.message, status:500});
    }
}